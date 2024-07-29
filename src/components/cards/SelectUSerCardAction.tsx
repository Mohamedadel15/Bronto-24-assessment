import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Ellipsis } from "lucide-react";
import UserBtn from "@/components/buttons/UserBtn";
import DeleteUserBtn from "@/components/buttons/DeleteUserBtn";

export default function SelectUSerCardAction({ user_details }: { user_details: any }) {
    return (
        <DropdownMenu>
            <div className="w-full flex justify-end">
                <DropdownMenuTrigger className=" w-fit text-white border-none outline-none cursor-pointer">
                    <Ellipsis size={24} />
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="absolute -right-3 w-[192px] p-0">
                <UserBtn />
                <DeleteUserBtn user_id={user_details?.id}  />
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
