import { PlusIcon } from "@/Components/Icons";

export default function DashboardCollectArea({
    Collect,
    collectMoney,
    setOpenCollectModal,
}: {
    Collect: string;
    collectMoney: number;
    setOpenCollectModal: any;
}) {
    return (
        <div className="p-6 text-gray-900 w-6/12 text-center">
            <img src={Collect} className="w-[200px] mx-auto" alt="জমা" />
            <h2 className="pt-2">আয়</h2>
            <h3 className="pb-2">
                total collect:-{" "}
                <span className="text-green-400">
                    {collectMoney}
                    tk
                </span>
            </h3>
            <button
                className="mx-auto bg-[#7eb20f] text-white rounded-lg p-2"
                onClick={() => setOpenCollectModal(true)}
            >
                <PlusIcon />
            </button>
        </div>
    );
}
