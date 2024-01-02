"use server";

import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function getChartData() {
	try {
		connectToDB();

		const mongoData = await User.aggregate([
			{
				$addFields: {
					__alias_0: {
						$cond: {
							if: {
								$isArray: "$threads",
							},
							then: {
								$size: "$threads",
							},
							else: 0,
						},
					},
				},
			},
			{
				$group: {
					_id: {
						__alias_1: "$name",
					},
					__alias_0: {
						$sum: "$__alias_0",
					},
				},
			},
			{
				$project: {
					_id: 0,
					__alias_1: "$_id.__alias_1",
					__alias_0: 1,
				},
			},
			{
				$project: {
					x: "$__alias_1",
					y: "$__alias_0",
					_id: 0,
				},
			},
			{
				$addFields: {
					__agg_sum: {
						$sum: ["$y"],
					},
				},
			},
			{
				$sort: {
					__agg_sum: -1,
				},
			},
			{
				$project: {
					__agg_sum: 0,
				},
			},
			{
				$limit: 5000,
			},
		]);
		return mongoData;
	} catch (error: any) {
		throw new Error(`failed to get chart data: ${error.message}`);
	}
}
