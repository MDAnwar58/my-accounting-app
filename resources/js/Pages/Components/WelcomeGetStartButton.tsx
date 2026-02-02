import { Link } from "@inertiajs/react";
import React from "react";

export default function WelcomeGetStartButton() {
    return (
        <div className="text-center pt-28">
            <Link
                href="/dashboard"
                className="px-11 p-3 rounded-lg bg-green-400 text-white"
            >
                শুরু করুন
            </Link>
        </div>
    );
}
