import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Icon = () => {
	return (
		<Avatar>
			<AvatarImage src="https://www.w3schools.com/howto/img_avatar.png" />
			<AvatarFallback>...</AvatarFallback>
		</Avatar>

	)
}