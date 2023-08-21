'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { PostProps } from "@/lib/types/components/post"

export const Post: React.FC<PostProps> = ({ title, author, date, content }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{author}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{content}</p>
			</CardContent>
			<CardFooter>
				<p>{date}</p>
			</CardFooter>
		</Card>
	)
}