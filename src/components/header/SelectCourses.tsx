import Image from "next/image";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SelectCourses() {
    return (
        <Select>
            <SelectTrigger className="w-fit hidden md:flex border-none bg-secondary">
                <div className="w-full flex justify-between items-center gap-4">
                    <SelectValue className="flex items-center gap-2" placeholder="Courses" />
                    <Image src="/arrow_down.svg" alt="chevron-down" width={12} height={8} />
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="java">Java Script</SelectItem>
                <SelectItem value="html">Html</SelectItem>
            </SelectContent>
        </Select>
    )
}