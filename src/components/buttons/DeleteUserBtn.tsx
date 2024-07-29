'use client';
import Image from 'next/image';

import UseISOpen from "@/hooks/useIsOpen";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import DeleteUserForm from '@/components/forms/DeleteUserForm';

export default function DeleteUserBtn({ user_id }: { user_id: number }) {
    const { isOpen, setIsOpen, handleClose, handleOpen } = UseISOpen()

    return (
        <>
            <button
                onClick={handleOpen}
                className='p-3  text-sm flex items-center text-red-100 w-full gap-2 justify-start'>
                <Image src='/trash.png' alt='edit' width={16} height={16} />
                Delete
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen} aria-describedby='modal-desc' >
                <DialogContent
                    id='modal-desc'
                    className="max-h-[80vh] overflow-y-auto bg-white ">
                    <DialogHeader>
                        <DialogTitle className="flex items-center my-2 capitalize text-black gap-3">
                            Delete users list
                        </DialogTitle>
                        <p className='text-sm text-gray-400'>Once you delete users list, you will lose all data associated with it.</p>
                    </DialogHeader>
                    <DeleteUserForm handleClose={handleClose} user_id = {user_id}/>
                </DialogContent>
            </Dialog>
        </>
    )
}
