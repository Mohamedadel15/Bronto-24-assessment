import { ChangeEvent } from "react";

interface InputDemoProps {
    id: string;
    label?: string | JSX.Element;
    style?: string;
    inputStyle?: string;
    type?: "text" | "email" | "date" | "password" | "number" | "file";
    placeHolder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    selectValue?: string;
    selectItem?: string[];
    defaultValue?: string;
    isChoices?: boolean | null;
    icon?: JSX.Element;
}

interface AddUSerFormState {
    name: string;
    user_name: string;
    age: string;
    job_title: string;
    country: string;
    success?: string;
    error?: string;
}

export type { InputDemoProps, AddUSerFormState };