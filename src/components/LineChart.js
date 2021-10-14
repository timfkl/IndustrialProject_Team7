import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartProgress = () => {
    return (
        <div> 
        {/* react chartjs line chart element */}
        <Line
          data =  {{
            labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6'],
             /* each dataset is a different line */
            datasets: [{
                label: 'Left Quad',
                data: [600, 560, 700, 1024, 1000, 1040],
                backgroundColor: ['purple'],
                borderColor: ['purple'],
                hoverBackgroundColor: ['White'],
            },
            {
                label: 'Right Quad',
                data: [401, 395, 390, 250, 190, 95],
                backgroundColor: ['blue'],
                borderColor: ['blue'],
                hoverBackgroundColor: ['White'],
            },
            {
                label: 'Left Hamstring',
                data: [802, 800, 740, 855, 790, 780],
                backgroundColor: ['orange'],
                borderColor: ['orange'],
                hoverBackgroundColor: ['White'],
            },
            {
                label: 'Right Hamstring',
                data: [340, 300, 250, 245, 256, 230],
                backgroundColor: ['black'],
                borderColor: ['black'],
                hoverBackgroundColor: ['White'],
            },
            
        ], 
        }}
        height={100}
        width={200}
        options={{
            maintainAspectRatio: true,
        }}
        />
        </div>
    )
}

export default LineChartProgress