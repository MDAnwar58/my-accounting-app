import React, { useRef, useState } from "react";
import { failMsg, successMsg, warningMsg } from "@/notify";
import axios from "axios";

export default function useAccountContext() {
    const [openCollectModal, setOpenCollectModal] = useState<any>(false);
    const [openExpenseModal, setOpenExpenseModal] = useState<any>(false);
    const [openEditModal, setOpenEditModal] = useState<any>(false);
    const [limit, setLimit] = useState<any>(10);
    const [length, setLangth] = useState<any>(0);
    const [accounts, setAccounts] = useState<any>([]);
    const [account, setAccount] = useState<any>({});
    const userId = useRef<HTMLInputElement>(null);
    const title = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);
    const price = useRef<HTMLInputElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const [time, setTime] = useState<any>(new Date());
    const [type, setType] = useState<any>("");
    const [image, setImage] = useState<any>("");
    const [errors, setErrors] = useState<any>([]);

    const [user, setUser] = useState<any>({});
    const [search, setSearch] = useState<any>("");
    const [collectMoney, setCollectMoney] = useState<any>(0);
    const [expenseMoney, setExpenseMoney] = useState<any>(0);

    const timeStringHandle = (time_string: any) => {
        const date = new Date(time_string);
        const timeString = date.toLocaleTimeString("en-GB", { hour12: false });
        return timeString;
    };

    const addAccountCollect = async (e: React.FormEvent) => {
        e.preventDefault();
        let user_id = userId.current === null ? "" : userId?.current.value;
        let Title = title.current === null ? "" : title?.current.value;
        let Price = price.current === null ? "" : price?.current.value;
        let InputDate = date.current === null ? "" : date?.current.value;
        try {
            const payload = {
                user_id: user_id!,
                title: Title!,
                price: Price!,
                date: InputDate!,
                time: timeStringHandle(time),
                type: type,
            };
            const response = await axios.post("/api/account-store", payload);
            if (response.data.status === "collect_success") {
                successMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(user_id);
                getExpenseMoney(user_id);
                setErrors([]);
                setOpenCollectModal(false);
            } else if (response.data.status === "expense_success") {
                warningMsg(response.data.msg);
                getAccounts(user, limit, search);
                getExpenseMoney(user_id);
                getExpenseMoney(user_id);
                setErrors([]);
                setOpenCollectModal(false);
            }
        } catch (error: any) {
            setErrors(error.response.data.errors);
        }
    };

    const addExpenseCollect = async (e: React.FormEvent) => {
        e.preventDefault();
        let user_id = userId.current === null ? "" : userId?.current.value;
        let Title = title.current === null ? "" : title?.current.value;
        let Amount = amount.current === null ? "" : amount?.current.value;
        let Price = price.current === null ? "" : price?.current.value;
        let InputDate = date.current === null ? "" : date?.current.value;
        try {
            const formData = new FormData();
            formData.append("user_id", user_id!);
            formData.append("title", Title!);
            formData.append("amount", Amount!);
            formData.append("price", Price!);
            formData.append("type", type);
            formData.append("date", InputDate!);
            formData.append("time", timeStringHandle(time));
            formData.append("image", image);
            const response = await axios.post("/api/account-store", formData);
            if (response.data.status === "collect_success") {
                successMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(user_id);
                getExpenseMoney(user_id);
                setErrors([]);
                setOpenExpenseModal(false);
            } else if (response.data.status === "expense_success") {
                warningMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(user_id);
                getExpenseMoney(user_id);
                setErrors([]);
                setOpenExpenseModal(false);
            }
        } catch (error: any) {
            setErrors(error.response.data.errors);
        }
    };

    const getAccounts = async (User: any, Limit: any, Search: any) => {
        const response = await axios.get(
            `/api/get-accounts?user_id=${User.id}limit=${Limit}&search=${Search}`
        );
        setLangth(response.data.length);
        setAccounts(response.data.accounts);
    };

    const getCollectMoney = async (userId: any) => {
        const response = await axios.get(`/api/get-collect-money/${userId}`);
        setCollectMoney(response.data);
    };
    const getExpenseMoney = async (userId: any) => {
        const response = await axios.get(`/api/get-expense-money/${userId}`);
        setExpenseMoney(response.data);
    };

    const deleteAccount = async (id: string) => {
        const response = await axios.get(`/api/account-delete/${id}`);
        if (response.data.status) {
            successMsg(response.data.msg);
            getAccounts(user, limit, search);
            getCollectMoney(user.id);
            getExpenseMoney(user.id);
        }
    };

    const getAccount = async (id: string) => {
        const response = await axios.get(`/api/account-edit/${id}`);
        setAccount(response.data);
        const dateString = response.data.date_time;
        const [datePart, timePart] = dateString.split(" ");
        setTime(timePart);
        setOpenEditModal(true);
    };

    const updateAccount = async (e: React.FormEvent, id: string) => {
        e.preventDefault();
        let Amount = amount.current === null ? "" : amount?.current.value;
        let user_id = userId.current === null ? "" : userId?.current.value;
        let Title = title.current === null ? "" : title?.current.value;
        let Price = price.current === null ? "" : price?.current.value;
        let InputDate = date.current === null ? "" : date?.current.value;

        try {
            const formData = new FormData();
            formData.append("user_id", user_id!);
            formData.append("title", Title!);
            formData.append("amount", Amount);
            formData.append("price", Price!);
            formData.append("type", type);
            formData.append("date", InputDate!);
            formData.append("time", time);
            formData.append("image", image);

            const response = await axios.post(
                `/api/account-update/${id}`,
                formData
            );
            if (response.data.status === "collect_success") {
                successMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(user_id);
                setErrors([]);
                setOpenEditModal(false);
            } else if (response.data.status === "expense_success") {
                warningMsg(response.data.msg);
                getAccounts(user, limit, search);
                getExpenseMoney(user_id);
                setErrors([]);
                setOpenEditModal(false);
            }
        } catch (error: any) {
            setErrors(error.response.data.errors);
        }
    };

    const onSearchHanlde = (e: any) => {
        setSearch(e.target.value);
        getAccounts(user, limit, e.target.value);
    };

    const onLoadMoreHandle = (limitNewValue: any) => {
        setLimit((prev: any) => prev + limitNewValue);
        getAccounts(user, limit + limitNewValue, search);
    };

    return {
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
        openExpenseModal,
        setOpenExpenseModal,
        setLimit,
        getAccount,
        account,
        userId,
        title,
        amount,
        price,
        date,
        time,
        setTime,
        setImage,
        setType,
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
    };
}
