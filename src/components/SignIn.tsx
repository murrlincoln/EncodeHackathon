'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { SSX } from '@spruceid/ssx'
import { useState } from 'react'
import AccountInfo from './AccountInfo'
import Deploy from './Deploy'


export const SignIn = () => {
	const [ssxProvider, setSSX] = useState<SSX | null>(null)

	const ssxHandler = async () => {
		const ssx = new SSX({
			providers: {
				server: {
					host: 'http://localhost:3000/api',
				},
			},
		})
		await ssx.signIn()
		setSSX(ssx)
	}

	const ssxLogoutHandler = async () => {
		ssxProvider?.signOut()
		setSSX(null)
	}

	const address = ssxProvider?.address() || ''
	return (
		<div className="w-full flex justify-center">

			<Card className="w-1/2 rounded-lg">
				<CardHeader className="w-full flex justify-center">
					<CardTitle className="text-center">Sign in with MetaMask</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex flex-col justify-center items-center">
					{ssxProvider ? (
						<>
							<Button onClick={ssxLogoutHandler}>SIGN-OUT</Button>
							<AccountInfo
								address={ssxProvider?.address()}
								session={ssxProvider?.session()}
							/>
						</>
					) : (
						<Button onClick={ssxHandler}>SIGN-IN WITH ETHEREUM</Button>
					)}				</CardContent>
				<CardFooter className="w-full flex justify-center"></CardFooter>
				{/* <CardFooter>
					<p>Card Footer</p>
				</CardFooter> */}
			</Card>
		</div>

	)
}
