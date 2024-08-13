import { SVGAttributes } from "react";
import logo from "@/Assets/images/logo.png";
import { usePage } from "@inertiajs/react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    const { url, component } = usePage();

    return (
        <img
            src={logo}
            alt="..."
            className={` ${url === "/login" ? "w-[110px]" : "w-[80px]"}`}
        />
    );
}
