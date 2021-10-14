import React from 'react';
import { Line } from 'react-chartjs-2';

var sleepData = [4, 4, 5, 5, 4, 3];
var driveData = [3, 2, 3, 2, 3, 3];
var stressData = [4, 3, 5, 4, 3, 2];
var moodData = [3, 1, 3, 2, 2, 2];

export function changeData (sleep, drive, stress, mood) {
    sleepData.push(sleep);
    driveData.push(drive);
    stressData.push(stress);
    moodData.push(mood);
    //the variables now hold the correct updated data
    //the chart needs redrawn somehow here
    moodData = [3, 1, 3, 2, 2, 2,2];
    LineChartWellBeing();
}

const LineChartWellBeing = () => {
    return (
        <div> 
        {/* react chartjs line chart element */}
        <Line
          data =  {{
            labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6'],
             /* each dataset is a different line */
            datasets: [{
                label: 'Sleep',
                data: sleepData,
                backgroundColor: ['green'],
                borderColor: ['green'],
                hoverBackgroundColor: ['White'],
            },
            {
                label: 'Drive',
                data: driveData,
                backgroundColor: ['blue'],
                borderColor: ['blue'],
                hoverBackgroundColor: ['White'],
            },
            {
                label: 'Stress',
                data: stressData,
                backgroundColor: ['orange'],
                borderColor: ['orange'],
                hoverBackgroundColor: ['White'],
            },
            {
                label: 'Mood',
                data: moodData,
                backgroundColor: ['red'],
                borderColor: ['red'],
                hoverBackgroundColor: ['White'],
            },
            
        ], 
        }}
        height={100}
        width={200}
        backgroundColor={'white'}
        options={{
            maintainAspectRatio: true,
        }}
        />
        </div>
    )
}


export default LineChartWellBeing