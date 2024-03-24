import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const getMax = (values) => {
    let maxi = 0;
    for (let val of values) {
        maxi = Math.max(maxi, val);
    }
    console.log(maxi);
    return maxi;
};

const createPieChart = (data, id, setColors) => {
    if (data.hasOwnProperty(null)) delete data[null];
    if (data.hasOwnProperty(undefined)) delete data[undefined];
    if (data.hasOwnProperty("")) delete data[""];
    const keys = Object.keys(data);
    const values = Object.values(data);

    const newData = [];
    Object.keys(data).forEach(key => {
        newData.push({ "platform": key, "percentage": data[key] });
    });

    const svgWidth = 700, svgHeight = 300, radius = Math.min(svgWidth, svgHeight) / 2;
    const svg = d3.create('svg').attr('width', svgWidth).attr('height', svgHeight);

    const g = svg.append('g').attr('transform', `translate(${radius}, ${radius})`);
    const color = d3.scaleOrdinal(d3.schemeCategory10); // Use a categorical color scale
    const pie = d3.pie().value(d => d.percentage);
    const path = d3.arc().outerRadius(radius).innerRadius(0);
    const arc = g.selectAll('arc').data(pie(newData)).enter().append('g');

    arc.append('path')
        .attr('d', path)
        .attr('fill', (d, i) => color(i));
    const colors = {}
    const sum = values.reduce((sum, val) => sum + val, 0);
    const avg = (sum) / values.length;
    // console.log(avg + "avg " + values);
    let updatedKeys = keys.filter(key => Number(data[key]) >= Number(avg))
    updatedKeys = updatedKeys.slice(0,Math.min(10,updatedKeys.length))
    // console.log("updated keys: " + updatedKeys);

    updatedKeys.forEach((key, ind) => colors[key] = color(ind));
    setColors(colors);
    document.getElementById(id).appendChild(svg.node());
};

const PieChart = ({ data, label, id }) => {
    const [colors, setColors] = useState({})
    useEffect(() => {
        createPieChart(data, id, setColors);
    }, [data, id]);


    return (

        <div style={{ border: '1px solid gray', borderRadius: '15px', padding: '10px', margin: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ marginTop: "20px" }}>
                    {colors &&
                        Object.keys(colors).map((label, ind) => (
                            <div style={{ margin: "-10px ", padding: "0px" }} key={ind}>
                                <div style={{ backgroundColor: `${colors[label]}`, width: '8px', height: '8px', display: 'inline-block', margin: "0px", marginRight: '5px', borderRadius: '3px' }}></div>
                                <div style={{ fontSize: '10px', display: 'inline-block', margin: '0px' }}>{label}</div>
                            </div>
                        ))}
                </div>
                <div>
                    <svg id={id}></svg>

                </div>
            </div>
            <h4 style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>{label}</h4>

        </div>

    );
};

const getModifiedData = (data, label) => {
    const temp = {};
    data.forEach((object) => {
        if (object[label] in temp) {
            temp[object[label]] += 1;
        } else {
            temp[object[label]] = 0;
        }
    });
    return temp;
};

const PieCharts = ({ data }) => {
    const country = getModifiedData(data, 'country');
    const topic = getModifiedData(data, 'topic');
    const region = getModifiedData(data, 'region');
    const sector = getModifiedData(data, 'sector');
    const pestle = getModifiedData(data, 'pestle');
    const source =getModifiedData(data, 'source');

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <PieChart data={country} label={'Country'} id="countryChart" />
            <PieChart data={topic} label={'Topic'} id="topicChart" />
            <PieChart data={source} label={'Source'} id="sourceChart" />
            <PieChart data={region} label={'Region'} id="regionChart" />
            <PieChart data={sector} label={'Sector'} id="sectorChart" />
            <PieChart data={pestle} label={'Pestle'} id="pestleChart" />
        </div>
    );
};

export default PieCharts;
