from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

data_file = 'hospital_data_analysis.json'

# Load hospital data from JSON file
def load_data():
    with open(data_file, 'r', encoding='utf-8') as file:
        return json.load(file)

hospital_data = load_data()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify: ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API to fetch all patient records
@app.get("/api/patients")
def get_patients():
    return hospital_data

# API to search for a patient by ID
@app.get("/api/patients/{patient_id}")
def get_patient_by_id(patient_id: int):
    patient = next((p for p in hospital_data if p['Patient_ID'] == patient_id), None)
    if patient:
        return patient
    raise HTTPException(status_code=404, detail="Patient not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)

    # uvicorn main:app --host 0.0.0.0 --port 5000 --reload
