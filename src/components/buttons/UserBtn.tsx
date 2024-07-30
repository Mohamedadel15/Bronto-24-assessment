'use client';

import Image from 'next/image';

import UseISOpen from '@/hooks/useIsOpen';
import { UserBtnProps, UserDetails } from '@/lib/types';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EditUserForm from '@/components/forms/EditUserForm';
import AddUserForm from '@/components/forms/AddUserForm';

export default function UserBtn({ addUser = false, default_user_details, handleCloseDropDown }: UserBtnProps) {
    const { isOpen, setIsOpen, handleClose, handleOpen } = UseISOpen()

    const handleCloseDialog = () => {
        handleClose();
        handleCloseDropDown && handleCloseDropDown();
    }
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
                                handleClose={handleCloseDialog}
                            />
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}
