import Image from 'next/image'

import { sideVavItems } from '@/lib/constant-data'
import { cn } from '@/lib/utils'

export default function SideNav({ className = {} }) {
    return (
        <nav className={cn('py-6 px-2 bg-primary justify-center ', className)}>
            <div className='w-[50px] h-[50px] flex items-center justify-center'>
                <Image src='logo.svg' alt='Logo' priority width={30} height={30} />
            </div>
            <ul className='flex flex-col'>
                {
                    sideVavItems?.map((item, index) => (
                        <li key={index} className='flex items-center justify-center py-4 px-2'><Image src={item} alt={item} priority width={20} height={20} /></li>
                    ))
                }
            </ul>
        </nav>
    )
}
