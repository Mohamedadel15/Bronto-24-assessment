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
    handleCloseDropDown?: () => void;
}

interface AddUserFormProps {
    handleClose: () => void;
    default_value: {
        id: number;
        name: string;
        user_name: string;
        age: number | string;
        job_title: string;
        created_at: string;
        country: {
            name: string;
            id: number;
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

interface FormData {
    get(key: string): string | null;
}
interface actionUserDetails {
    id: number;
    name: string;
    user_name: string;
    age: number;
    job_title: string;
    created_at: string;
    country: number;
    [key: string]: any; // Add this line
}

interface ResponseData {
    message?: string;
    token?: string;
    detail?: any;
}

interface Response {
    error?: string;
    data?: ResponseData;
    detail?: string;
}

export type { InputDemoProps, AddUSerFormState, UserBtnProps, UserDetails, FormData, actionUserDetails, ResponseData, Response, AddUserFormProps };