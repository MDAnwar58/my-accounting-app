import React from "react";
import MoneyTobe from "@/Assets/images/money-tobe.png";

export default function WelcomeMoneyTobe() {
    return (
        <div className="pt-24 pb-12">
            <img
                src={MoneyTobe}
                alt="Laravel screenshot"
                className="h-52 w-auto mx-auto object-cover"
            />
        </div>
    );
}
