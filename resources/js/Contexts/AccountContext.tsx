import React, { useRef, useState } from "react";
import { failMsg, successMsg, warningMsg } from "@/notify";
import axios from "axios";

export default function useAccountContext() {
    const [openCollectModal, setOpenCollectModal] = useState(false);
    const [openExpenseModal, setOpenExpenseModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [length, setLangth] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState({});
    const userId = useRef<HTMLInputElement>(null);
    const title = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);
    const price = useRef<HTMLInputElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const [time, setTime] = useState(new Date());
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);

    const [user, setUser] = useState({});
    const [search, setSearch] = useState("");
    const [collectMoney, setCollectMoney] = useState(0);
    const [expenseMoney, setExpenseMoney] = useState(0);

    const timeStringHandle = (time_string) => {
        const date = new Date(time_string);
        const timeString = date.toLocaleTimeString("en-GB", { hour12: false });
        return timeString;
    };

    const addAccountCollect = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                user_id: userId.current.value,
                title: title.current.value,
                price: price.current.value,
                date: date.current.value,
                time: timeStringHandle(time),
                type: type,
            };
            const response = await axios.post("/api/account-store", payload);
            if (response.data.status === "collect_success") {
                successMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(userId.current.value);
                setErrors([]);
                setOpenCollectModal(false);
            } else if (response.data.status === "expense_success") {
                warningMsg(response.data.msg);
                getAccounts(user, limit, search);
                getExpenseMoney(userId.current.value);
                setErrors([]);
                setOpenCollectModal(false);
            }
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const addExpenseCollect = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("user_id", userId.current.value);
            formData.append("title", title.current.value);
            formData.append("amount", amount.current.value);
            formData.append("price", price.current.value);
            formData.append("type", type);
            formData.append("date", date.current.value);
            formData.append("time", timeStringHandle(time));
            formData.append("image", image);
            const response = await axios.post("/api/account-store", formData);
            if (response.data.status === "collect_success") {
                successMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(userId.current.value);
                setErrors([]);
                setOpenExpenseModal(false);
            } else if (response.data.status === "expense_success") {
                warningMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(userId.current.value);
                setErrors([]);
                setOpenExpenseModal(false);
            }
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const getAccounts = async (User, Limit, Search) => {
        const response = await axios.get(
            `/api/get-accounts?user_id=${User.id}limit=${Limit}&search=${Search}`
        );
        setLangth(response.data.length);
        setAccounts(response.data.accounts);
    };

    const getCollectMoney = async (userId) => {
        const response = await axios.get(`/api/get-collect-money/${userId}`);
        setCollectMoney(response.data);
    };
    const getExpenseMoney = async (userId) => {
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
        // Split the dateString to separate date and time
        const [datePart, timePart] = dateString.split(" ");
        setTime(timePart);
        setOpenEditModal(true);
    };

    const updateAccount = async (e: React.FormEvent, id: string) => {
        e.preventDefault();
        // console.log(time);
        try {
            const formData = new FormData();
            formData.append("user_id", userId.current.value);
            formData.append("title", title.current.value);
            formData.append("amount", amount.current.value);
            formData.append("price", price.current.value);
            formData.append("type", type);
            formData.append("date", date.current.value);
            formData.append("time", time);
            formData.append("image", image);
            const response = await axios.post(
                `/api/account-update/${id}`,
                formData
            );
            // console.log(response.data);

            if (response.data.status === "collect_success") {
                successMsg(response.data.msg);
                getAccounts(user, limit, search);
                getCollectMoney(userId.current.value);
                setErrors([]);
                setOpenEditModal(false);
            } else if (response.data.status === "expense_success") {
                warningMsg(response.data.msg);
                getAccounts(user, limit, search);
                getExpenseMoney(userId.current.value);
                setErrors([]);
                setOpenEditModal(false);
            }
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const onSearchHanlde = (e) => {
        setSearch(e.target.value);
        getAccounts(user, limit, e.target.value);
    };

    const onLoadMoreHandle = (limitNewValue) => {
        setLimit((prev) => prev + limitNewValue);
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
