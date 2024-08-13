import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Card from "@/Components/Card";
import Collect from "@/Assets/images/money.png";
import Expense from "@/Assets/images/expense.png";
import additionalMoney from "@/Assets/images/money1.png";
import { CrossIcon, PlusIcon } from "@/Components/Icons";
import useAccountContext from "@/Contexts/AccountContext";
import CollectModal from "@/Components/CollectModal";
import ExpenseModal from "@/Components/ExpenseModal";
import { useEffect } from "react";
import AccountList from "@/Components/AccountList";
import FilterAndSearch from "@/Components/FilterAndSearch";

export default function Dashboard({ auth }: PageProps) {
    const {
        user,
        setUser,
        getAccounts,
        getCollectMoney,
        collectMoney,
        getExpenseMoney,
        expenseMoney,
        limit,
        length,
        accounts,
        openCollectModal,
        setOpenCollectModal,
        getAccount,
        account,
        openExpenseModal,
        setOpenExpenseModal,
        userId,
        title,
        amount,
        price,
        date,
        time,
        setTime,
        setType,
        setImage,
        errors,
        addAccountCollect,
        addExpenseCollect,
        deleteAccount,
        openEditModal,
        setOpenEditModal,
        updateAccount,
        search,
        onSearchHanlde,
        onLoadMoreHandle,
    } = useAccountContext();

    useEffect(() => {
        setUser(auth.user);
        getAccounts(user, limit, search);
        getCollectMoney(auth.user.id);
        getExpenseMoney(auth.user.id);
    }, [user, limit, search]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-3">
                    <Card className="md:flex">
                        <div className="flex items-center md:w-8/12 w-full">
                            <div className="p-6 text-gray-900 w-6/12 text-center">
                                <img
                                    src={Collect}
                                    className="w-[200px] mx-auto"
                                    alt="জমা"
                                />
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
                            <div className="p-6 text-gray-900 w-6/12 text-center">
                                <img
                                    src={Expense}
                                    className="w-[200px] mx-auto"
                                    alt="জমা"
                                />
                                <h2 className="pt-2">খরচ</h2>
                                <h3 className="pb-2">
                                    total exponse:-{" "}
                                    <span className="text-red-400">
                                        {expenseMoney}tk
                                    </span>
                                </h3>

                                <button
                                    className="mx-auto bg-[#7eb20f] text-white rounded-lg p-2"
                                    onClick={() => setOpenExpenseModal(true)}
                                >
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
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
                    </Card>
                </div>
            </div>

            <FilterAndSearch onSearchHanlde={onSearchHanlde} />

            <AccountList
                auth={auth}
                accounts={accounts}
                length={length}
                deleteAccount={deleteAccount}
                getAccount={getAccount}
                account={account}
                openEditModal={openEditModal}
                setOpenEditModal={setOpenEditModal}
                updateAccount={updateAccount}
                title={title}
                amount={amount}
                price={price}
                date={date}
                time={time}
                setTime={setTime}
                setType={setType}
                setImage={setImage}
                errors={errors}
                onLoadMoreHandle={onLoadMoreHandle}
            />

            <CollectModal
                auth={auth}
                setOpenModal={setOpenCollectModal}
                openModal={openCollectModal}
                addAccountCollect={addAccountCollect}
                userId={userId}
                title={title}
                price={price}
                date={date}
                time={time}
                setTime={setTime}
                setType={setType}
                errors={errors}
            />
            <ExpenseModal
                auth={auth}
                setOpenModal={setOpenExpenseModal}
                openModal={openExpenseModal}
                addExpenseCollect={addExpenseCollect}
                userId={userId}
                title={title}
                amount={amount}
                price={price}
                date={date}
                time={time}
                setTime={setTime}
                setType={setType}
                setImage={setImage}
                errors={errors}
            />
        </AuthenticatedLayout>
    );
}
