import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import PatientDetails from "../patientdetails/PatientDetails";
import Footer from "../footer/Footer"; 

function Dashboard() {
    const [data, setData] = useState([]);
    const [patientData, setPatientData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/hospital-data")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <>
            <Header setPatientData={setPatientData} setError={setError} />
            {error && <p className="error">{error}</p>}
            <PatientDetails patientData={patientData} />
            {data.length === 0 && <p>Loading data...</p>}
            <Footer /> 
        </>
    );
}

export default Dashboard;
