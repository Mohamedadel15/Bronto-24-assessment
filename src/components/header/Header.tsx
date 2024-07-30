import Image from "next/image";

import { header_icons } from "@/lib/constant-data";

import SmSideNav from "@/components/header/SmSideNav";
import SelectCourses from "@/components/header/SelectCourses";

export default function Header() {
    return (
        <header className='flex justify-between w-full px-6 py-4 border-b'>
            <SmSideNav />
            <SelectCourses />
            <nav className="flex items-center gap-4">
                <ul className='flex gap-4'>
                    {
                        header_icons.map((icon, index) => (
                            <li key={index}>
                                <Image src={icon} alt={icon} width={32} height={32} />
                            </li>
                        ))
                    }
                </ul>
                <Image src='/profile_image.png' alt='profile_image' width={32} height={32} />
            </nav>
        </header>
    )
}
