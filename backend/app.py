from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# ✅ Apply CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development, change to specific origin later)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# ✅ Load COVID-19 data with error handling
try:
    with open("country_wise_latest.json", "r") as file:
        covid_data = json.load(file)
except Exception as e:
    print(f"Error loading JSON file: {e}")
    covid_data = []

@app.get("/api/covid/{country}")
def get_covid_data(country: str):
    country = country.capitalize()  # Normalize country name
    country_data = next((item for item in covid_data if item["Country/Region"] == country), None)
    
    if country_data:
        return {
            "Total Cases": country_data["Confirmed"],
            "Total Deaths": country_data["Deaths"],
            "Total Recovered": country_data["Recovered"],
            "Active Cases": country_data["Active"],
            "WHO Region": country_data["WHO Region"],
            "Tests Conducted": country_data.get("Tests", "N/A")
        }
    
    raise HTTPException(status_code=404, detail="Country not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
