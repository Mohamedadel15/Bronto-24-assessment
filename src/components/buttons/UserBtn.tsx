'use client';

import Image from 'next/image';

import UseISOpen from '@/hooks/useIsOpen';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function UserBtn({ addUser = false }) {
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
                        <DialogTitle className="flex items-center my-5 capitalize text-primary gap-3">
                            ;hjh
                        </DialogTitle>
                    </DialogHeader>
                    {/* {
                        DialogForm && <DialogForm handleClose={handleClose} />
                    } */}
                </DialogContent>
            </Dialog>
        </>
    )
}
