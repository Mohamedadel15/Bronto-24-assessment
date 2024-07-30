import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { handleAddUSer } from "@/lib/action";
import { AddUSerFormState } from "@/lib/types";

import InputDemo from "@/components/helper/Input-demo";
import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import { ComboboxDemo } from "@/components/helper/Combobox";

interface AddUserFormProps {
    handleClose: () => void
}

interface choice {
    name: string;
    id: number;
}

export default function AddUserForm({ handleClose }: AddUserFormProps) {
    const [country, setCountry] = useState<choice | null>(null);

    const [state, formAction] = useFormState<AddUSerFormState>(handleAddUSer as any, {
        name: "",
        user_name: "",
        age: "",
        job_title: "",
        country: "",
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            handleClose();
        } else if (state.error) {
            toast.error(state.error);
        }
    }, [state]);
    return (
        <form
            action={formAction}
            className="w-full flex flex-col space-y-4"
        >
            
            <input type="hidden" name="country" value={country?.id || ""} />

            <InputDemo
                id="name"
                label="Name"
                type="text"
                placeHolder="Enter your full name"
                error={state.name}
            />
            <InputDemo
                id="user_name"
                label="Username"
                type="text"
                placeHolder="Enter your username"
                error={state.user_name}
            />
            <InputDemo
                id="age"
                label="Age"
                type="number"
                placeHolder="Enter your age"
                error={state.age}
            />
            <ComboboxDemo
                placeHolder="Select Your Country. . ."
                error={state?.country}
                end_point="/countries/"
                setSelected={setCountry}
                label="Country"
            />
            <InputDemo
                id="job_title"
                label="Job Title"
                type="text"
                placeHolder="Enter your job title"
                error={state.job_title}
            />

            <div className="flex items-center justify-end w-full gap-4">
                <button
                    type='button'
                    className='text-primary border border-primary px-5 py-2 rounded-md text-sm '
                    onClick={handleClose}>
                    Cancel
                </button>
                <FormSubmittingButton name="Save changes" style="bg-primary" />
            </div>
        </form>
    )
}
