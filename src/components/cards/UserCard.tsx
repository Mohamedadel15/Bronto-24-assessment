import Image from 'next/image'

import SelectUSerCardAction from '@/components/cards/SelectUSerCardAction'

interface UserCardProps {
    user_details: {
        id: number;
        user_name: string;
        age: number;
        job_title: string;
        name: string;
        created_at: string;
        country: {
            id: number;
            name: string;
        };
    }
}

export default function UserCard({ user_details }: UserCardProps) {
    return (
        <main
            style={{ backgroundImage: 'url(/card.png)' }}
            className='w-full  h-[350px] flex flex-col justify-between rounded-md p-2 bg-cover bg-center bg-no-repeat '>
            <SelectUSerCardAction user_details={user_details} />
            <div className='flex flex-col justify-end  w-full h-full rounded-lg gap-2'>
                <p className='rounded-xl bg-white text-primary capitalize w-fit py-1 px-3 text-xs'>{user_details?.job_title}</p>
                <h2 className='text-white font-bold'>{user_details?.name}</h2>
                <div className='flex items-center gap-4 pb-3'>
                    <div className='flex items-center gap-2'>
                        <Image src='/profile2.png' alt='user profile' width={16} height={16} />
                        <p className='text-white text-sm'>{user_details?.user_name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src='/calendar-tick.png' alt='user profile' width={16} height={16} />
                        <p className='text-white text-sm'>{new Date(user_details?.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src='/clock.png' alt='user profile' width={16} height={16} />
                        <p className='text-white text-sm'>{user_details?.age}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
