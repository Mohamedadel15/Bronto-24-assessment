import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UserBtn from "@/components/buttons/UserBtn";
import DeleteUserBtn from "@/components/buttons/DeleteUserBtn";

import { Ellipsis } from "lucide-react";

interface UserDetailsProps {
    user_details: {
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
}

export default function SelectUSerCardAction({ user_details }: UserDetailsProps) {
    return (
        <DropdownMenu>
            <div className="w-full flex justify-end">
                <DropdownMenuTrigger className=" w-fit text-white border-none outline-none cursor-pointer">
                    <Ellipsis size={24} />
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="absolute -right-3 w-[192px] p-0">
                <UserBtn default_user_details={user_details} />
                <DeleteUserBtn user_id={user_details?.id} />
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
