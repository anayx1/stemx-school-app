// app/components/PerformanceChart.tsx
'use client'; // required for useEffect + Chart.js

import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const PerformanceChart = ({ performanceData }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        setChartData({
            labels: performanceData.subjects,
            datasets: [
                {
                    label: 'Your Score',
                    data: performanceData.scores,
                    backgroundColor: '#4361EE',
                    borderColor: '#4361EE',
                    borderWidth: 1,
                    borderRadius: 6,
                },
                {
                    label: 'Class Average',
                    data: performanceData.classAverage,
                    backgroundColor: '#F72585',
                    borderColor: '#F72585',
                    borderWidth: 1,
                    borderRadius: 6,
                }
            ]
        });
    }, [performanceData]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        family: 'Inter'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#212529',
                bodyColor: '#212529',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                caretSize: 8,
                displayColors: true,
                boxWidth: 12,
                boxHeight: 12,
                usePointStyle: true,
                boxPadding: 6,
                bodyFont: { size: 12, family: 'Inter' },
                titleFont: { size: 14, family: 'Inter', weight: 'bold' }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    display: true,
                    drawBorder: false,
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: { size: 11, family: 'Inter' }
                }
            },
            x: {
                grid: { display: false, drawBorder: false },
                ticks: { font: { size: 11, family: 'Inter' } }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm p-5 mb-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold">Performance Overview</h3>
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-800">
                    <option value="month">This Month</option>
                    <option value="semester">This Semester</option>
                    <option value="year">This Year</option>
                </select>
            </div>
            <div className="relative h-[240px]">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default PerformanceChart;
