import LineChart from "@/components/LineChart";

function Page() {
	return (
		<section className="flex flex-col w-full h-full justify-center items-center bg-slate-500">
			<div className="flex flex-col justify-center items-center w-full h-fit bg-slate-200">
				I am a page
				<LineChart />
			</div>
		</section>
	);
}

export default Page;
