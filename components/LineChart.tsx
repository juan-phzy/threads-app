"use client";
import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	plugins: {
		title: {
			display: true,
			text: "Bar Chart of Total Threads per User",
		},
	},
	responsive: true,
	maintainAspectRatio: false,
	interaction: {
		mode: "index" as const,
	},
};

const LineChart = (passedData: any) => {
	const chartInfo = passedData.mongoData;
	const data = {
		labels: chartInfo.map((data: any) => data.x),
		datasets: [
			{
				label: "Dataset 1",
				data: chartInfo.map((data: any) => data.y),
				backgroundColor: "rgb(255, 99, 132)",
			},
		],
	};
	return <Bar options={options} data={data} />;
};

export default LineChart;
