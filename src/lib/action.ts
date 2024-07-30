"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/utils";

interface FormData {
    get(key: string): string | null;
}
interface UserDetails {
    id: number;
    name: string;
    user_name: string;
    age: number;
    job_title: string;
    created_at: string;
    country: number;
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
    ! ############ ADD User FUNCTION ###################
*/
async function handleAddUSer(prevState: any, formData: FormData) {
    const FormData = {
        name: formData.get("name"),
        user_name: formData.get("user_name"),
        age: formData.get("age"),
        country: formData.get("country"),
        gender: 'Male',
        job_title: formData.get("job_title"),
    };

    if (!FormData.name) {
        return { name: "Name is required" };
    }

    if (!FormData.user_name) {
        return { user_name: "USer Name IS Required !" };
    }

    if (!FormData.age) {
        return { age: "Age is required" };
    }

    if (!FormData.country) {
        return { country: "Country is required" };
    }

    if (!FormData.job_title) {
        return { job_title: "Job title is required" };
    }

    // ######### Post Actions #########
    else {
        let redirectPath;
        try {
            const response = await fetch(BASE_URL + "/userprofiles/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(FormData),
            });
            const data = await response.json();
            if (response.status === 201 || response.status === 200) {
                revalidatePath(`/`, "page");
                return { success: "User created successfully" };
            } else if (response.status === 401) {
                redirectPath = "/login";
            } else {
                redirectPath = null;
                return {
                    error:
                        data?.message || "Error Occur !",
                };
            }
        } catch (error) {
            redirectPath = null;
            throw new Error("An error occurred while creating the user");
        } finally {
            redirectPath && redirect(redirectPath);
        }
    }
}

/* 
    ! ############ UPDATE User FUNCTION ###################
*/
async function handleUpdateUser(formData: UserDetails , id : number) {
    let redirectPath;
    try {
        const response = await fetch(BASE_URL + "/userprofiles/update/" + id + "/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            revalidatePath(`/`, "page");
            return { success: "User updated successfully" };
        } else if (response.status === 401) {
            redirectPath = "/login";
        } else {
            return {
                error: data?.message || "Error Occur !",
            };
        }
    } catch (error) {
        throw new Error("An error occurred while updating the user");
    } finally {
        redirectPath && redirect(redirectPath);
    }
}

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
export { GetDataInServerSide, handleDeleteRow, handleAddUSer, handleUpdateUser };