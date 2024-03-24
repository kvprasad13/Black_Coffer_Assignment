import React, { useEffect } from 'react';
import * as d3 from 'd3';

const getMax = (values) => {
    let maxi = 0;
    for (let val in values) {
        maxi = Math.max(maxi, val);
    }
    console.log(maxi);
    return maxi
};
const createBarChart = (data, id) => {
    if (data.hasOwnProperty(null)) delete data[null];
    if (data.hasOwnProperty(undefined)) delete data[undefined];
    if (data.hasOwnProperty("")) delete data[""];
    const keys = Object.keys(data);
    const values = Object.values(data);

    const svgWidth = 25 * keys.length, svgHeight = Math.max(300, getMax(values) + 5), barPadding = 8;
    const barWidth = (svgWidth / keys.length);

    const colors = d3.scaleOrdinal(d3.schemeCategory10); // Define color scale

    const svg = d3.select(`#${id}`)
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    const barChart = svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('x', (_, i) => barWidth * i)
        .attr('y', (d) => svgHeight - d)
        .attr('height', (d) => d)
        .attr('width', barWidth - barPadding)
        .attr('fill', (_, i) => colors(i)); // Assign color based on index

    // Add labels on top of bars
    const labels = svg.selectAll('text')
        .data(values)
        .enter()
        .append('text')
        .text((d, i) => `${keys[i]}`)
        .attr('x', (_, i) => barWidth * i + (barWidth - barPadding) / 2)
        .attr('y', (d) => svgHeight - d - 5) // Position slightly above the bar
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', 'black');
};

const BarChart = ({ data, label, id }) => {
    useEffect(() => {
        createBarChart(data, id);
    }, [data, id]);

    return <div style={{ border: '1px solid gray', borderRadius: '15px', padding: '10px', margin: '10px' }}><svg id={id}></svg><h4 style={{}}>{label}</h4></div>;
};
const BarCharts = ({ data }) => {
    // Your data processing logic here
    const attributes = ['country', 'topic', 'region', 'sector', 'pestle', 'intensity', 'likelihood', 'relevance', 'start_year', 'end_year'];

    const intensities = {};
    data.map((object) => {
        if (object['intensity'] in intensities) {
            intensities[object['intensity']] += 1;
        }
        else {
            intensities[object['intensity']] = 0;
        }
    });

    const likelihoods = {};
    data.map((object) => {
        if (object['likelihood'] in likelihoods) {
            likelihoods[object['likelihood']] += 1;
        }
        else {
            likelihoods[object['likelihood']] = 0;
        }
    });

    const relevances = {};
    data.map((object) => {
        if (object['relevance'] in relevances) {
            relevances[object['relevance']] += 1;
        }
        else {
            relevances[object['relevance']] = 0;
        }
    });
    const startYears = {};
    data.map((object) => {
        if (object['start_year'] in startYears) {
            startYears[object['start_year']] += 1;
        }
        else {
            startYears[object['start_year']] = 0;
        }
    });
    const endYears = {};
    data.map((object) => {
        if (object['end_year'] in endYears) {
            endYears[object['end_year']] += 1;
        }
        else {
            endYears[object['end_year']] = 0;
        }
    });
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <BarChart data={intensities} label={'Intensity'} id="intensityChart" />
            <BarChart data={likelihoods} label={'Likelihood'} id="likelihoodChart" />
            <BarChart data={relevances} label={'Relevance'} id="relevanceChart" />
            <BarChart data={startYears} label={'Start Year'} id="startYearChart" />
            <BarChart data={endYears} label={'End Year'} id="endYearChart" />
        </div>

    );
};

export default BarCharts;
