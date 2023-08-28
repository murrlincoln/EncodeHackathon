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
import Mint from './Mint'
import Deploy from "./Deploy"
import FetchPosts from './FetchPosts'
import { SetStateAction, useState } from 'react'

export const Profile = () => {
	const [name, setName] = useState<string>('');
	const [bio, setBio] = useState<string>('');
	const [profileAddress, setProfileAddress] = useState<string>('');

	const handleDeploy = (address: string) => {
		// Logic to deploy profile and update profileAddress state
		setProfileAddress(address);
	};
	
	return (
		<div className="w-full flex justify-center">
			<Card className="w-3/4 rounded-xl">
				<CardHeader>
					<CardTitle icon={<Icon />}>Johnathon Doerman</CardTitle>
					<CardDescription>Bio goes here</CardDescription>
				</CardHeader>
				{/* Show deploy elemnt if profileAddress is empty else show address  */}

				<CardContent>
					{profileAddress ? (
					<p>Contract Address: {profileAddress}</p>
					) : (
					<>
						<p>Deploy a profile NFT</p>
						<Deploy onDeploy={handleDeploy} />
					</>
        			)}
				</CardContent>
				<CardContent>
					<p>Mint a post NFT</p>
					<Mint ProfileAddress={profileAddress}/>
				</CardContent>
				<CardContent>
					<p>Previous Posts</p>
					<FetchPosts ProfileAddress={profileAddress}/>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>

		</div>

	)
}