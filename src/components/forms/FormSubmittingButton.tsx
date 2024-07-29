'use client';

import { useFormStatus } from "react-dom";

import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";


export default function FormSubmittingButton({ name = "", style = '' }) {
    const { pending } = useFormStatus();
    return (
        <button type='submit' className={cn("px-5 py-2 text-lg font-medium rounded-lg text-white text-[16px] bg-custom-gradient ", style)} disabled={pending}>
            {pending ? <LoaderCircle className="animate-spin" size={25} /> : name}
        </button >
    );
}