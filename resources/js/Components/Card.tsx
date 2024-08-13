import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    className?: any;
}

export default function Card({ children, className }: Props) {
    return (
        <div
            className={`bg-white border-2 border-[#7eb20f] overflow-hidden shadow-sm rounded-lg ${className}`}
        >
            {children}
        </div>
    );
}
