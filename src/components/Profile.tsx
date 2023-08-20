'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Icon } from "@/components/Icon"

export const Profile = () => {
	return (
		<div className="w-full flex justify-center">
			<Card className="w-3/4 rounded-xl">
				<CardHeader>
					<CardTitle icon={<Icon />}>Johnathon Doerman</CardTitle>
					<CardDescription>Bio goes here</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>

		</div>

	)
}