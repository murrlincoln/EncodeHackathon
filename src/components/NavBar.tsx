'use client'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function NavBar() {
	return (
		<div className="w-full justify-center flex">

			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink href="/">Home</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="/sign-in">Sign In</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="/profile">Profile</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>

	)
}