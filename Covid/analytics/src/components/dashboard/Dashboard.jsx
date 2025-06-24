import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import Footer from "../footer/Footer";
import Top5Countries from "../top5countries/Top5Countries";
import Gauge from "../gaugechart/Gauge";
 
 

function Dashboard() {
    const [country, setCountry] = useState("");
    const [covidData, setCovidData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const cardNames = [
        { name: "Total Cases", icon: "📊", trend: "+2.5%", color: "#4e73df" },
        { name: "Total Deaths", icon: "💔", trend: "+1.2%", color: "#e74a3b" },
        { name: "Total Recovered", icon: "💪", trend: "+4.8%", color: "#1cc88a" },
        { name: "Active Cases", icon: "🏥", trend: "-0.7%", color: "#f6c23e" },
        { name: "WHO Region", icon: "🌍", trend: null, color: "#36b9cc" },
        { name: "Tests Conducted", icon: "🔬", trend: "+3.1%", color: "#6f42c1" }
    ];

    const fetchCovidData = async () => {
        if (!country.trim()) {
            setError("Please enter a country name");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/covid/${country}`);
            setCovidData(response.data);
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
            setCovidData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchCovidData();
        }
    };

    return (
        <div className="dashboard">
            <nav className="nav">
                <div className="nav-content">
                    <h1>Covid-19 Analytics Dashboard</h1>
                    <p className="subtitle">Real-time global pandemic tracking and analysis</p>
                </div>
                
                <div className="searchbox">
                    <div className="search-container">
                        <div className="input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input 
                                type="text" 
                                placeholder="Enter Country Name..." 
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <button 
                            className="button"
                            onClick={fetchCovidData}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                </div>
            )}

            <div className="cards-container">
                {cardNames.map(({ name, icon, trend, color }) => (
                    <div
                        key={name}
                        className="card"
                        style={{ borderLeft: `4px solid ${color}` }}
                    >
                        <div className="card-header">
                            <span className="card-icon">{icon}</span>
                            <h2>{name}</h2>
                        </div>
                        <div className="card-content">
                            {isLoading ? (
                                <div className="loader"></div>
                            ) : (
                                <>
                                    <p className={name.replace(/\s+/g, "-").toLowerCase()}>
                                        {covidData ? covidData[name] : "No data"}
                                    </p>
                                    {trend && (
                                        <span className={`trend ${trend.startsWith('+') ? 'positive' : 'negative'}`}>
                                            {trend}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Top5Countries />

            <Gauge />
            <Footer />
        </div>
    );
}

export default Dashboard;
