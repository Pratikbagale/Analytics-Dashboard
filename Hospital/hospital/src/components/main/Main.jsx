import React from "react";
import "./Main.css";

function Main() {
    const categories = [
        "Age", "Gender", "Condition", "Procedure", "Cost",
        "Length of Stay", "Readmission", "Outcome", "Satisfaction"
    ];    

    return (
        <div className="main">
            {categories.map((category, index) => (
                <div key={index} className="category-box">
                    <h3>{category}</h3>
                </div>
            ))}
        </div>
    );
}

export default Main;
