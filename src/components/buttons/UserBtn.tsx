'use client';

import Image from 'next/image';

import UseISOpen from '@/hooks/useIsOpen';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EditUserForm from '../forms/EditUserForm';
import AddUserForm from '../forms/AddUserForm';

interface UserBtnProps {
    addUser?: boolean;
    default_user_details?: {
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

interface UserDetails {
    id: number;
    name: string;
    user_name: string;
    age: number;
    job_title: string;
    created_at: string;
    country: {
        id: number;
        name: string;
    };
}



export default function UserBtn({ addUser = false, default_user_details }: UserBtnProps) {
    const { isOpen, setIsOpen, handleClose, handleOpen } = UseISOpen()

    return (
        <>
            {
                addUser ? (
                    <button
                        onClick={handleOpen}
                        className='bg-primary text-white py-1 px-4 rounded-md text-sm'>
                        <span className='mr-2 text-xl'>+</span>
                        New User
                    </button>
                ) : (
                    <button
                        onClick={handleOpen}
                        className='p-3  text-sm flex items-center text-[#2C29B0] w-full gap-2 justify-start border-b'>
                        <Image src='/edit.png' alt='edit' width={16} height={16} />
                        Edit
                    </button>
                )
            }
            <Dialog open={isOpen} onOpenChange={setIsOpen} aria-describedby='modal-desc' >
                <DialogContent
                    id='modal-desc'
                    className="max-h-[80vh] overflow-y-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle className="flex items-center my-2 capitalize text-black gap-3 font-bold text-2xl">
                            {addUser ? 'Add New User' : 'Edit User'}
                        </DialogTitle>
                        <p className='text-sm text-gray-400'>
                            It will take a couple of minutes.
                            Change profile settings and confirm with SMS code.
                        </p>
                        <h2 className='font-bold'>Your personal data</h2>
                    </DialogHeader>
                    {
                        addUser ? <AddUserForm handleClose={handleClose} />
                            : <EditUserForm
                                default_value={default_user_details as UserDetails}
                                handleClose={handleClose} />
                    }
                    {/* {
                        DialogForm && <DialogForm handleClose={handleClose} />
                    } */}
                </DialogContent>
            </Dialog>
        </>
    )
}
