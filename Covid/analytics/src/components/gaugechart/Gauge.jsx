import React from "react";
// import { Gauge, gaugeClasses} from '@mui/x-charts/Gauge';
// import { DefaultLegendContent } from "recharts";

import "./Gauge.css";

function Gauge(){

// const Gauge = ({
//     value, valueMax = 100, startAngle = -110, endAngle = 110, label
// }) => {
    return(
        <>
        {/* <div style={{textAlign: 'center'}}>
            <h3>{label}</h3>
            <Gauge 
            
            value={value}
            valueMax={valueMax}
            startAngle={startAngle}
            endAngle={endAngle}

            sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: 'translate(0px, 0px)',
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
              
            />
        </div> */}

        <div className="gauge-container">

          <div className="gauge1"> Gauge1</div>

          <div className="gauge2"> Gauge2</div>



        </div>


        
        </>
    );
}

export default Gauge;
