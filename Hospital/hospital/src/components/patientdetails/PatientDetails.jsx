import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./PatientDetails.css";

function PatientDetails({ patientData }) {
    // Provide default values when patientData is null
    const defaultData = {
        Age: "",
        Gender: "",
        Condition: "",
        Procedure: "",
        Cost: "",
        Length_of_Stay: "",
        Readmission: "",
        Outcome: "",
        Satisfaction: ""
    };

    // Use patientData if available, otherwise use defaultData
    const data = patientData || defaultData;

    // Function to generate and download PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Patient Details Report", 20, 10);
    
        // Table data
        const tableColumn = ["Field", "Value"];
        const tableRows = [
            ["Age", data.Age || "N/A"],
            ["Gender", data.Gender || "N/A"],
            ["Condition", data.Condition || "N/A"],
            ["Procedure", data.Procedure || "N/A"],
            ["Cost", data.Cost ? `$${data.Cost}` : "N/A"],
            ["Length of Stay", data.Length_of_Stay ? `${data.Length_of_Stay} days` : "N/A"],
            ["Readmission", data.Readmission || "N/A"],
            ["Outcome", data.Outcome || "N/A"],
            ["Satisfaction", data.Satisfaction ? `${data.Satisfaction}/5` : "N/A"]
        ];
    
        // Use autoTable correctly
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
    
        doc.save("Patient_Details.pdf");
    };
    

    return (
        <div className="patient-container">
            <h2>Patient Details</h2>

            <form className="patient-form">
                <div className="form-group">
                    <label>Age</label>
                    <input type="text" value={data.Age} readOnly />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" value={data.Gender} readOnly />
                </div>

                <div className="form-group">
                    <label>Condition</label>
                    <input type="text" value={data.Condition} readOnly />
                </div>

                <div className="form-group">
                    <label>Procedure</label>
                    <input type="text" value={data.Procedure} readOnly />
                </div>

                <div className="form-group">
                    <label>Cost</label>
                    <input type="text" value={data.Cost ? `$${data.Cost}` : ""} readOnly />
                </div>

                <div className="form-group">
                    <label>Length of Stay</label>
                    <input type="text" value={data.Length_of_Stay ? `${data.Length_of_Stay} days` : ""} readOnly />
                </div>

                <div className="form-group">
                    <label>Readmission</label>
                    <input type="text" value={data.Readmission} readOnly />
                </div>

                <div className="form-group">
                    <label>Outcome</label>
                    <input type="text" value={data.Outcome} readOnly />
                </div>

                <div className="form-group">
                    <label>Satisfaction</label>
                    <input type="text" value={data.Satisfaction ? `${data.Satisfaction}/5` : ""} readOnly />
                </div>
            </form>

            {/* Download Button */}
            <button className="download-btn" onClick={handleDownloadPDF}>
                Download PDF
            </button>
        </div>
    );
}

export default PatientDetails;
