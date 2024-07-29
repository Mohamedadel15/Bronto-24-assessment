import { handleDeleteRow } from "@/lib/action";

import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import { toast } from "sonner";

interface DeleteUserFormProps {
    handleClose: () => void,
    user_id: number
}

export default function DeleteUserForm({ handleClose, user_id }: DeleteUserFormProps) {
    const handleDeleteUSerAction = async () => {
        await handleDeleteRow("/userprofiles/delete", user_id, "/").then((res: any) => {
            if (res.success) {
                toast.success(res.success);
                handleClose();
            }
            res.error && toast.error(res.error);
        })
    }
    return (
        <form action={handleDeleteUSerAction}>
            <div className='flex justify-end items-center mt-5 gap-4'>
                <button
                    type='button'
                    className='text-black border px-5 py-2 rounded-md text-sm '
                    onClick={handleClose}>
                    Cancel
                </button>
                <FormSubmittingButton name='Delete' style='bg-[#FEE2E2] text-red-100' />
            </div>
        </form>
    )
}
