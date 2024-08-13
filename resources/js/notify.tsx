import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successMsg = (msg) => {
    toast.success("😍 " + msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};
const warningMsg = (msg) => {
    toast.success("😏 " + msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};
const failMsg = (msg) => {
    toast.error("🤬 " + msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

export { successMsg, warningMsg, failMsg };
