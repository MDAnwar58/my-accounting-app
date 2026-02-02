import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Card from "@/Components/Card";
import Collect from "@/Assets/images/money.png";
import Expense from "@/Assets/images/expense.png";
import useAccountContext from "@/Contexts/AccountContext";
import CollectModal from "@/Components/CollectModal";
import ExpenseModal from "@/Components/ExpenseModal";
import { useEffect } from "react";
import AccountList from "@/Components/AccountList";
import FilterAndSearch from "@/Components/FilterAndSearch";
import DashboardCollectArea from "./Components/DashboardCollectArea";
import DashboardExpenseArea from "./Components/DashboardExpenseArea";
import DashboardTotalMoneyArea from "./Components/DashboardTotalMoneyArea";

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
                            <DashboardCollectArea
                                Collect={Collect}
                                collectMoney={collectMoney}
                                setOpenCollectModal={setOpenCollectModal}
                            />
                            <DashboardExpenseArea
                                Expense={Expense}
                                expenseMoney={expenseMoney}
                                setOpenExpenseModal={setOpenExpenseModal}
                            />
                        </div>
                        <DashboardTotalMoneyArea
                            collectMoney={collectMoney}
                            expenseMoney={expenseMoney}
                        />
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
