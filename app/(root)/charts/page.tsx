import LineChart from "@/components/LineChart";
import { getChartData } from "@/lib/actions/data.actions";

export default async function Page() {
	const daData = await getChartData();
	console.log(daData);

	return (
		<section className="flex flex-col w-full h-full justify-center items-center bg-slate-500">
			<div className="relative flex justify-center items-center w-[90%] h-[90%] bg-slate-200">
				<LineChart mongoData={daData} />
			</div>
		</section>
	);
}
