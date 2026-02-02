import { PlusIcon } from "@/Components/Icons";
import React from "react";

export default function DashboardExpenseArea({
    Expense,
    expenseMoney,
    setOpenExpenseModal,
}: {
    Expense: string;
    expenseMoney: number;
    setOpenExpenseModal: any;
}) {
    return (
        <div className="p-6 text-gray-900 w-6/12 text-center">
            <img src={Expense} className="w-[200px] mx-auto" alt="জমা" />
            <h2 className="pt-2">খরচ</h2>
            <h3 className="pb-2">
                total exponse:-{" "}
                <span className="text-red-400">{expenseMoney}tk</span>
            </h3>

            <button
                className="mx-auto bg-[#7eb20f] text-white rounded-lg p-2"
                onClick={() => setOpenExpenseModal(true)}
            >
                <PlusIcon />
            </button>
        </div>
    );
}
