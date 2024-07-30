import { useState } from "react";
import { toast } from "sonner";

import { AddUserFormProps } from "@/lib/types";
import { handleUpdateUser } from "@/lib/action";
import { CompareValues } from "@/lib/utils";

import InputDemo from "@/components/helper/Input-demo";
import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import { ComboboxDemo } from "@/components/helper/Combobox";

interface UserDetails {
  name: string;
  user_name: string;
  age: number;
  job_title: string;
  country: number;
  [key: string]: any; // Add this line
}

interface choice {
  name: string;
  id: number;
}

interface Response {
  error?: string;
  // other properties
}

export default function EditUserForm({ handleClose, default_value }: AddUserFormProps) {
  const [country, setCountry] = useState<choice | null>(default_value?.country || null);
  const [name, setName] = useState<string>(default_value.name);
  const [user_name, setUserName] = useState<string>(default_value.user_name);
  const [age, setAge] = useState<string>(default_value.age as string);
  const [job_title, setJobTitle] = useState<string>(default_value.job_title);

  const handleResponse = (res: Response) => {
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("User updated successfully");
      handleClose();
    }
  };

  const handleEditUserAction = async () => {
    let data: UserDetails = {
      name,
      user_name,
      age: Number(age),
      job_title,
      country: Number(country?.id),
    }

    let default_data: UserDetails = {
      name: default_value.name,
      user_name: default_value.user_name,
      age: Number(default_value.age),
      job_title: default_value.job_title,
      country: Number(default_value.country.id),
    }

    if (!CompareValues(data, default_data)) {
      toast.warning("No changes made");
    } else {
      await handleUpdateUser(
        CompareValues(data, default_data)
        , default_value.id
      ).then((res) => handleResponse(res as Response));
    }
  }
  return (
    <form
      action={handleEditUserAction}
      className="w-full flex flex-col space-y-4"
    >

      <input type="hidden" name="country" value={country?.id || ""} />

      <InputDemo
        id="name"
        label="Name"
        type="text"
        placeHolder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputDemo
        id="user_name"
        label="Username"
        type="text"
        placeHolder="Enter your username"
        value={user_name}
        onChange={(e) => setUserName(e.target.value)}
      />
      <InputDemo
        id="age"
        label="Age"
        type="number"
        placeHolder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <ComboboxDemo
        placeHolder={country?.name || "Select country"}
        end_point="/countries/"
        setSelected={setCountry}
        label="Country"

      />
      <InputDemo
        id="job_title"
        label="Job Title"
        type="text"
        placeHolder="Enter your job title"
        value={job_title}
        onChange={(e) => setJobTitle(e.target.value)}
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
