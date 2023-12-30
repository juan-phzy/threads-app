//___________________________________________IMPORTS______________________________________________________________
//
//
import { currentUser } from "@clerk/nextjs"; // Gets information about the currently logged-in user from Clerk
import { redirect } from "next/navigation"; // Used to redirect user to onboarding if needed
//
//
import ThreadCard from "@/components/cards/ThreadCard"; // Original card component to display threads
//
//
import { fetchPosts } from "@/lib/actions/thread.actions"; // Original function to return threads from database
import { fetchUser } from "@/lib/actions/user.actions"; // Original function to return user from database
//
//________________________________________END OF IMPORTS___________________________________________________________

//__________________________ASYNCHRONOUS TSX FUNCTION TO DISPLAY HOME PAGE_________________________________________
//
export default async function Home() {
	/*
|	SCRIPT LAYOUT BEFORE RETURNING TSX:
|
|	1. GET USER FROM CLERK
|		A. IF NO USER RETURN NULL
|
|	2. GET USER FROM DATABASE USING CLERK USER ID
|
|	3. CHECK IF USER IS ONBOARDED
|		B. IF NOT, REDIRECT TO ONBOARDING PAGE
|	
|	4. FETCH RECENT THREADS FROM DATABASE
|
	*/
	// 1.
	const user = await currentUser();
	console.log(user);
	if (!user) {
		redirect("/sign-in");
		return null;
	}

	// 2.
	console.log("fetching userinfo");
	const userInfo = await fetchUser(user.id);

	// 3.
	if (!userInfo?.onboarded) redirect("/onboarding");

	// 4.
	const result = await fetchPosts(1, 30);

	// Return TSX
	return (
		<>
			{/* Displaying the page title */}
			<h1 className="head-text text-left">Home</h1>

			{/* Displaying the thread cards or a message based on whether threads are found. */}
			<section className="mt-9 flex flex-col gap-10">
				{/* Checking if there are no threads found */}
				{result.posts.length === 0 ? (
					<p className="no-result">No threads found</p>
				) : (
					<>
						{/* Mapping through the posts and rendering ThreadCard for each */}
						{result.posts.map((post) => (
							<ThreadCard
								key={post._id}
								id={post._id}
								currentUserId={user?.id || ""}
								parentId={post.parentId}
								content={post.text}
								author={post.author}
								community={post.community}
								createdAt={post.createdAt}
								comments={post.children}
							/>
						))}
					</>
				)}
			</section>
		</>
	);
}
