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
			text: "Chart.js Bar Chart - Stacked",
		},
	},
	responsive: true,
	interaction: {
		mode: "index" as const,
		intersect: false,
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
};

const mongoData = [
	{ x: "alecia", y: 2 },
	{ x: "Juan", y: 1 },
	{ x: "Juan Pablo", y: 1 },
];
const blah = [1, 2, 3];

export const data = {
	labels: mongoData.map((data) => data.x),
	datasets: [
		{
			label: "Dataset 1",
			data: blah,
			backgroundColor: "rgb(255, 99, 132)",
			stack: "Stack 0",
		},
	],
};

const LineChart = () => {
	return <Bar options={options} data={data} />;
};

export default LineChart;
