import { ButtonHTMLAttributes } from "react";

export default function SuccessButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-[#7eb20f] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#6a960c] focus:bg-[#6a960c] active:bg-[#68920c] focus:outline-none focus:ring-2 focus:ring-[#7eb20f] focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
