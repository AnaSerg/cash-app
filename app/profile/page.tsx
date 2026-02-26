"use client";

import {useBear} from "@/store/target";
import Link from "next/link";

export default function Profile() {
    const increasePopulation = useBear((state) => state.increasePopulation);
    return (
        <div>
            <Link href="/">тык</Link>
            <button onClick={increasePopulation}>one up</button>
        </div>

    )

}
