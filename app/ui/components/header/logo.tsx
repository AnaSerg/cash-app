import { manrope } from '@/app/ui/fonts';
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <h1
                className={`${manrope.className} font-bold text-2xl`}
            >
                куш
            </h1>
        </Link>
    );
}