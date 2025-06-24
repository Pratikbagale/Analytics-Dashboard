from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# ✅ Fix CORS issue by allowing requests from React's localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load COVID-19 data with error handling
try:
    with open("country_wise_latest.json", "r") as file:
        covid_data = json.load(file)
except Exception as e:
    print(f"Error loading JSON file: {e}")
    covid_data = []

from fastapi.responses import JSONResponse

@app.get("/api/covid/{country}")
def get_covid_data(country: str):
    country = country.capitalize()
    country_data = next((item for item in covid_data if item["Country/Region"] == country), None)

    if country_data:
        response = JSONResponse(content={
            "Total Cases": country_data["Confirmed"],
            "Total Deaths": country_data["Deaths"],
            "Total Recovered": country_data["Recovered"],
            "Active Cases": country_data["Active"],
            "WHO Region": country_data["WHO Region"],
            "Tests Conducted": country_data.get("Tests", "N/A")
        })
        response.headers["Access-Control-Allow-Origin"] = "*"  # ✅ Explicitly set CORS
        return response

    raise HTTPException(status_code=404, detail="Country not found")


@app.get("/api/top5countries")
def get_top_countries():
    try:
        sorted_countries = sorted(covid_data, key=lambda x: x.get("Confirmed", 0), reverse=True)[:5]
        top5 = [{"Country": country["Country/Region"], "TotalCases": country["Confirmed"]} for country in sorted_countries]
        
        # ✅ Add CORS headers explicitly (extra safety measure)
        from fastapi.responses import JSONResponse
        response = JSONResponse(content=top5)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing data: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)


# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
