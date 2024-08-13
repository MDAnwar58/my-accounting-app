import React from "react";

interface Props {
    type?: any;
    className?: any;
    placeholder?: any;
    onChange?: any;
    inputRef?: any;
    defaultValue?: any;
    value?: any;
}

export default function Input({
    type,
    className,
    placeholder,
    onChange,
    inputRef,
    defaultValue,
    value,
}: Props) {
    return (
        <input
            type={type}
            className={`border-gray-300 focus:border-[#7eb20f] focus:ring-[#7eb20f] rounded-md shadow-sm ${className}`}
            onChange={onChange}
            ref={inputRef}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
        />
    );
}
