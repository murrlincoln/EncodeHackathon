import { Post } from "./Post";
import { posts } from "@/lib/data/example-posts";

export default function Feed() {
	return (
		<div className="w-full justify-center flex">
			<div className="w-3/4 flex flex-col gap-8">
				{posts.map((post) => (
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						date={post.date}
						content={post.content}
					/>
				))}

			</div>
		</div>
	);
}