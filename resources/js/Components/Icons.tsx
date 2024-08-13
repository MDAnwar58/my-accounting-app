import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";

const PlusIcon = ({ className }: { className?: any }) => {
    return <FaPlus className={className} />;
};
const CrossIcon = ({ className }: { className?: any }) => {
    return <RxCross2 className={className} />;
};
const DeleteIcon = ({ className }: { className?: any }) => {
    return <RiDeleteBin6Line className={className} />;
};
const EditIcon = ({ className }: { className?: any }) => {
    return <MdOutlineModeEdit className={className} />;
};

export { PlusIcon, CrossIcon, DeleteIcon, EditIcon };
