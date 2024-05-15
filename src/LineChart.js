import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ChartComponent({ fetchedData }) {
    const chartRef = useRef(null);

    // Define renderChart function
    const renderChart = () => {
        const ctx = chartRef.current.getContext('2d');
        const years = fetchedData.map(entry => entry.data.map(tempEntry => tempEntry.year)).flat();
        const temperatures = fetchedData.map(entry => entry.data.map(tempEntry => tempEntry.temperature)).flat();

        const data = {
            labels: years,
            datasets: [
                {
                    label: 'Tempreture data for these particular years',
                    data: temperatures,
                    borderColor: 'red',
                    fill: true,
                    pointRadius: 8,
                },
            ],
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
            },
        };

        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        chartRef.current.chart = new Chart(ctx, config);
    };
    // eslint-disable-next-line
    useEffect(() => {
        if (fetchedData) {
            // eslint-disable-next-line
            renderChart(); // Call renderChart here
        }
    }, [fetchedData]);

    return <canvas ref={chartRef}></canvas>;
}

export default ChartComponent;
