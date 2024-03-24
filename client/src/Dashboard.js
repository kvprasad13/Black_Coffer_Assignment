import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from './Table.js';
import BarCharts from './BarChart.js';
import PieChart from './PieChart.js';
import { FaFilter } from "react-icons/fa";

const List = ({ data, label, setFilter }) => {
    // Extract unique keys from data based on the label
    const keys = new Set();

    return (
        <div style={{ border: "0.5px solid gray ", paddingBottom: "10px", paddingTop: "10px", paddingLeft: "5px", paddingRight: "10px", margin: "3px", backgroundColor: "rgb(243, 243, 243)", borderRadius: "20px", borderColor: "rgb(240, 240, 240)" }}>
            <label htmlFor="label">{label[0].toUpperCase() + label.slice(1).replace("_", " ") + " "} &#58; 	&nbsp;</label>
            <input type="text" name="label" id="" onChange={(e) => setFilter(label, e.target.value)} />
        </div>
    );
};

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData({});
    }, []);

    const fetchData = async (data) => {
        try {
            const query = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
            const url = `http://localhost:8000/?${query}`;
            console.log("url: " + url);
            const response = await axios.get(url);
            console.log(response);
            setData(response.data.data);
            setLoading(false);

        } catch (err) {
            console.error(err);
        }
    };

    const handleFilterClick = () => {

        const updatedFilters = {};
        Object.keys(filters).forEach((key) => {
            if (filters[key] !== undefined && filters[key] !== null) {
                updatedFilters[key] = filters[key];
            }
        });

        const updatedObject = {};
        Object.keys(updatedFilters).forEach((key) => {
            let value = updatedFilters[key];
            if (/^\d*$/.test(value)) {
                updatedObject[key] = Number(value);
            } else {
                updatedObject[key] = value;
            }
        });
        console.log(typeof updatedObject['start_year']);
        console.log("updatedObject " + JSON.stringify(updatedObject));
        fetchData(updatedObject);
        setFilters({ label: undefined }); // Clear the filters object here
        setItem("table");
        alert("Filter button clicked");

    };


    const setFilter = (label, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [label]: value
        }));
    }

    const [item, setItem] = useState("table");

    return (
        <div style={{ position: "relative" }} >
            <div className='h1' style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "rgb(253, 253, 253)", margin: 0 }}>Dashboard</div>
            <div className='nav navbar navbar-expand-lg bg-light  m-0 p-0  ' style={{ position: "sticky", top: 47, zIndex: 99, borderBottom: "0.5px solid rgb(180, 180, 180) " }}>
                <div className={` m-0 nav-child ${item === 'table' && 'bg-gray'} cursor-pointer `} onClick={() => setItem('table')}>
                    Table
                </div>
                <div style={{ backgroundColor: "rgb(230, 230, 230)" }} className={` m-0 nav-child ${item === 'barChart' && 'bg-gray'} cursor-pointer  `} onClick={() => setItem("barChart")}>Bar Chart</div>
                <div style={{ backgroundColor: "rgb(230, 230, 230)" }} className={`m-0 nav-child ${item === 'pieChart' && 'bg-gray'} cursor-pointer `} onClick={() => setItem("pieChart")}>Pie Chart</div>
                <div style={{ backgroundColor: "rgb(230, 230, 230)" }} className='m-0 nav-child  cursor-pointer ' onClick={() => {

                    fetchData({});
                    setItem("table");
                    alert("All records clicked!");

                }}>All Records</div>

                <div onClick={() => setItem("filter")} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className='nav-child cursor-pointer ' >
                    <FaFilter size={18} className='  ' />
                    <div style={{ marginLeft: "3px" }}>Filter</div>
                </div>
            </div>
            {item && item === 'filter' && (
                <div style={{ height: "553px", backgroundColor: " rgb(230, 230, 230)" }}>
                    <div style={{ position: 'fixed', top: '30%', left: '26%', transform: 'translate(-50%, -50%)', width: "600px", height: "330px", border: "0.7px solid rgb(243, 243, 243)", backgroundColor: "rgb(247, 247, 247)", borderRadius: "10px", transform: "scale(1)", transition: "transform 0.3s ease-in-out" }}>
                        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", marginTop: "10px" }}>
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'start_year'} />
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'end_year'} />
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'topic'} />
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'sector'} />
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'region'} />
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'source'} />
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'country'} />
                            <List setFilter={setFilter} style={{ flex: '1 0 50%' }} data={data} label={'pestle'} />
                        </div>
                        <button onClick={handleFilterClick} style={{ marginTop: "10px", width: "80px", borderRadius: "3px", border: "0.5px solid  rgb(180, 180, 180)", backgroundColor: " rgb(230, 230, 230)" }} className='cursor-pointer'>Filter</button>
                    </div>
                </div>
            )}
            {loading && <h4>Data is Loading....</h4>}
            {!loading && (!data || data.length === 0) && <h4>Data not found</h4>}
            {!loading && item === 'table' && <Table data={data} />}
            {!loading && item === "barChart" && <BarCharts data={data} />}
            {!loading && item === 'pieChart' && <PieChart data={data} />}

        </div>


    );
};

export default Dashboard;
