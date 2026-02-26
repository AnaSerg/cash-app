import Logo from "@/app/ui/components/header/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex flex-row items-center justify-between">
                <Logo />
                <Link href="/profile">
                    <Avatar size="lg">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>СА</AvatarFallback>
                    </Avatar>
                </Link>
        </div>
    );
}