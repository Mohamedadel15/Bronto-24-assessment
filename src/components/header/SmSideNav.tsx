'use client'

import UseISOpen from "@/hooks/useIsOpen"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import SideNav from "@/components/header/SideNav"

import { Menu } from "lucide-react"

export default function SmSideNav() {
    const { isOpen, setIsOpen, handleOpen } = UseISOpen()
    return (
        <>
            <button onClick={handleOpen} className="block md:hidden">
                <Menu size={30} />
            </button>
            <Sheet open={isOpen} onOpenChange={setIsOpen} aria-describedby='modal-desc'>
                <SheetContent side='left' className="bg-primary w-[120px]">
                    <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription>
                        </SheetDescription>
                    </SheetHeader>
                    <SideNav />
                </SheetContent>
            </Sheet>
        </>)
}
