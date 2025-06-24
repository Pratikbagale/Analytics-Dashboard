import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";

function Header({ setPatientData, setError }) {
    const [patientId, setPatientId] = useState(""); // state variable patientId and function to update patiendId

    //  Asynchronous Function
    const handleSearch = async () => {
        if (!patientId) {
            setError("Please enter a Patient ID.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/patients/${patientId}`);
            if (!response.ok) {
                throw new Error("Patient not found");
            }
            const data = await response.json();
            setPatientData(data);
            setError("");
        } catch (err) {
            setError(err.message);
            setPatientData(null);
        }
    };

    return (
        <>
            <div className="nav">
                <h1>Hospital Analytics Dashboard</h1>
            </div>

            <div className="nav1">
                <FontAwesomeIcon icon={faHospital} size="2x" />
                <div>
                    <h4>Alpha Superspeciality Hospital</h4>
                    <h5>Cardiac Sciences, Nephrology, Neurosciences, Orthopaedics, Urology, Gastroenterology, and Oncology.</h5>
                </div>

                <div className="searchbox">
                    <input 
                        type="text" 
                        placeholder="Enter Patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                    />
                    <button className="button" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </>
    );
}

export default Header;
