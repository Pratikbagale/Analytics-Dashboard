import React from "react";
import{ useState } from "react";
import "./Dashboard.css";
 
function Dashboard() {
    const [country, setCountry] = useState("");   // state variable country and function to uupdate country
    const [covidData, setCovidData] = useState(null);  //  stores fetched covid data 
    const [error, setError] = useState(null); // err msg if fetching fails

    // arr of cov statistics to be display
    const cardNames = [
        "Total Cases",
        "Total Deaths",
        "Total Recovered",
        "Active Cases",
        "WHO Region",
        "Tests Conducted"
    ];

    // maps each card to speciific color
    const colorMap = {
        "Total Cases": "blue",
        "Total Deaths": "red",
        "Total Recovered": "green",
        "Active Cases": "orange",
        "WHO Region": "purple",
        "Tests Conducted": "teal",
    };

    // Asynchronous function fetch data from local api
    const fetchCovidData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/covid/${country}`); // call api with selected country
            const data = await response.json(); // converts response into json format
            if (response.ok) {
                setCovidData(data); // update state with fetch data
                setError(null);
            } else {
                setError(data.error); // if req fials
                setCovidData(null);
            }
        } catch (err) {
            setError("Failed to fetch data");  // network failure displays an err msg
            setCovidData(null);
        }
    };
 
    return (
        <>
            <div className="nav">
                <h1>Covid-19 Analytics Dashboard</h1>
                 <div className="searchbox">
                    <input 
                        type="text" 
                        placeholder="Enter Country" 
                        value={country} // bind input to countyr state
                        onChange={(e) => setCountry(e.target.value)} // updt state 
                    />
                    <button className="button" onClick={fetchCovidData}>Search</button>
                </div>
            </div>

             {/* // error message display */}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}   

            <div className="cards-container">
    {cardNames.map((name, index) => (
        <div key={index} className="card">
            <h2>{name}</h2> 
            <br/>
            <br/>
            <p className={name.replace(/\s+/g, "-").toLowerCase()}>
                {/* if data exists then display it  */}
                {covidData ? covidData[name] : "Loading..."}
            </p>
        </div>
    ))}
</div>

<footer className="footer">
                <p>&copy; {new Date().getFullYear()} Covid-19 Analytics Dashboard. All Rights Reserved.</p>
            </footer>
        </>
    );
}

export default Dashboard;
