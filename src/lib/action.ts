"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/utils";

interface FormData {
    get(key: string): string | null;
}

interface LoginForm_data {
    email: string;
    password: string;
}
interface FormError {
    email?: string;
    full_name?: string;
    password?: string;
    national_image?: string;
    error?: string;
    success?: string;
    token?: string;
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

function handleError(response: Response, data: ResponseData) {
    const error = data.message ?? response.error ?? response.data?.message ?? data?.detail ?? 'error occurred Please try again later';
    return { error };
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUserName(userName: string): boolean {
    return /^[a-zA-Z0-9 ]{3,30}$/.test(userName);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/* 
    ! ############ GET DATA IN SERVER SIDE FUNCTION ###################
    * @param {string} End_Point - request end point
    * @param {object} headers - request headers
    * @param {object} method - request Another method
    ? {...} - request body parameters or query parameters
*/
async function GetDataInServerSide(
    End_Point = "",
    ExtraMethod = {},
) {
    let redirectPath = null;
    try {
        const response = await fetch(BASE_URL + End_Point, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            ...ExtraMethod,
        });
        // Handle successful response
        if (response.ok) {
            const data = await response.json();
            return data;
        }

        // Handle unauthorized response
        else if (response.status === 401) {
            redirectPath = "/login";
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        throw new Error('An error occurred while fetching data');
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}

/* 
    ! ############ POST DATA IN SERVER SIDE FUNCTION ###################
    * @param {string} End_Point - request end point
    * @param {object} headers - request headers
    * @param {object} method - request Another method
    ? {...} - request body parameters or query parameters
*/



/* 
    ! ############ DELETE FUNCTION ###################
    * @param {string} End_Point - request end point
    * @param {object} id - request id
    * @param {object} path - revaildate path
    ? {...} - request body parameters or query parameters
*/
async function handleDeleteRow(End_Point: string, id: number, pathUrl: string) {
    let redirectPath;
    try {
        const response = await fetch(BASE_URL + End_Point + "/" + id + "/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = {};
        if (response.status !== 204) {
            // 204 No Content
            const text = await response.text();
            try {
                data = JSON.parse(text);
            } catch (e) {
                return { error: "An error occurred while deleting the record" };
                // Handle malformed JSON or unexpected content here
            }
        }

        if (response.ok) {
            // Shorthand for status 200-299
            revalidatePath(pathUrl);
            return { success: "Record deleted successfully" };
        } else if (response.status === 401) {
            redirectPath = "/login";
        } else {
            return handleError(data, data);
        }
    } catch (e) {
        throw new Error("An error occurred while deleting the record");
    } finally {
        redirectPath && redirect(redirectPath);
    }
}
export { GetDataInServerSide, handleDeleteRow };