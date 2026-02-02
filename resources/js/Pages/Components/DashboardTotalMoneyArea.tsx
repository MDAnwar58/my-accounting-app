import React from "react";
import additionalMoney from "@/Assets/images/money1.png";

export default function DashboardTotalMoneyArea({
    collectMoney,
    expenseMoney,
}: {
    collectMoney: number;
    expenseMoney: number;
}) {
    return (
        <div className="p-6 text-gray-900 md:w-4/12 w-full text-center">
            <img
                src={additionalMoney}
                className="w-[200px] mx-auto"
                alt="জমা"
            />

            <h3 className="pt-3 pb-2 text-green-400">
                total collect:- {collectMoney}tk
            </h3>
            <h3 className="pb-2 text-red-400">
                total exponse:- {expenseMoney}tk
            </h3>
            <h2 className="pb-3">
                অবশিষ্ট মোট টাকার হিসাব:-{" "}
                <b className=" text-yellow-300 font-bold">
                    {collectMoney - expenseMoney}tk
                </b>
            </h2>
        </div>
    );
}
