'use client';

import { FC } from "react";

import { handleKeyDown, handleWheel } from "@/lib/utils";
import { InputDemoProps } from "@/lib/types";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const InputDemo: FC<InputDemoProps> = ({
    id,
    label,
    style = '',
    inputStyle = '',
    type = 'text',
    placeHolder = '',
    disabled = false,
    value,
    onChange,
    error = '',
}) => {
    return (
        <div className={`grid grid-cols-1 w-full ${style} items-center gap-1`}>
            {label && (
                <Label htmlFor={id} className={`flex items-center gap-2 text-[13px] cursor-pointer w-fit ${error ? 'text-red-800' : 'text-[#242731]'}`}>
                    <p>{label}</p>
                </Label>
            )}
            <div className="w-full flex-1 relative">
                <Input
                    type={type}
                    id={id}
                    className={`outline-0  border ${error ? ' border-red-800' : 'border-gray-300'} focus-visible:ring-0 focus-visible:ring-offset-0 ${disabled ? 'bg-gray-300' : ''} ${inputStyle} rounded-md`}
                    placeholder={placeHolder}
                    onKeyDown={handleKeyDown}
                    onWheel={handleWheel}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    name={id}
                    min={type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                />
                {error && <p className="text-red-800 text-xs pt-1 m-0">{error}</p>}
            </div>
        </div>
    );
};

export default InputDemo;