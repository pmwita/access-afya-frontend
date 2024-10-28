import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './App.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
} from 'chart.js';

// Registering all necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const GET_METRICS = gql`
    query GetMetrics {
        wrongPrescription
        expiredStock
        lostSales
        lateCheckIn
        taskEfficiencyData
        patientSatisfaction
        efficiency
        serviceAvailability
        waitTime
        consultationTime
    }
`;

const Dashboard = ({ onLogout }) => {
    const { loading, error, data } = useQuery(GET_METRICS);
    const [selectedMetric, setSelectedMetric] = useState('allMetrics');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const metrics = {
        wrongPrescription: data.wrongPrescription || 0,
        expiredStock: data.expiredStock || 0,
        lostSales: data.lostSales || 0,
        lateCheckIn: data.lateCheckIn || 0,
        taskEfficiencyData: data.taskEfficiencyData || 0,
        patientSatisfaction: data.patientSatisfaction || 0,
        efficiency: data.efficiency || 0,
        serviceAvailability: data.serviceAvailability || 0,
        waitTime: data.waitTime || 0,
        consultationTime: data.consultationTime || 0,
    };

    const allMetricsData = {
        labels: Object.keys(metrics),
        datasets: [{
            label: 'All Metrics',
            data: Object.values(metrics),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const selectedData = {
        labels: [selectedMetric],
        datasets: [{
            label: selectedMetric,
            data: [metrics[selectedMetric]],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }],
    };

    const renderCharts = () => {
        if (selectedMetric === 'allMetrics') {
            return (
                <div className="chart-wrapper">
                    <Bar data={allMetricsData} options={{ responsive: true, maintainAspectRatio: true }} />
                    <Line data={allMetricsData} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>
            );
        } else {
            return (
                <div className="chart-wrapper">
                    <Bar data={selectedData} options={{ responsive: true, maintainAspectRatio: true }} />
                    <Line data={selectedData} options={{ responsive: true, maintainAspectRatio: true }} />
                    <Pie data={selectedData} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>
            );
        }
    };

    return (
        <div className="dashboard-container">
            <div className="navbar">
                <h1>Access Afya Kenya LTD</h1>
                <div className="navbar-items">
                    <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        &#9776;
                    </button>
                    <div className="user-info">
                        <div className="user-icon"></div>
                        <span className="username">Admin</span>
                    </div>
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                </div>
            </div>
            <h1 className="dashboard-title">Analytics Dashboard</h1>
            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar">
                    <h2>Metrics</h2>
                    <div className="metric-item" onClick={() => setSelectedMetric('allMetrics')}>
                        All Metrics
                    </div>
                    {Object.keys(metrics).map((metric) => (
                        <div key={metric} onClick={() => setSelectedMetric(metric)} className="metric-item">
                            {metric.replace(/([A-Z])/g, ' $1')}
                        </div>
                    ))}
                </div>
                <div className="chart-area">
                    {renderCharts()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
