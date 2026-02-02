import React, { Fragment } from "react";
import Card from "./Card";
import { DeleteIcon, EditIcon } from "./Icons";
import AgoDays from "./AgoDays";
import EditModal from "./EditModal";

interface Props {
    auth?: any;
    accounts?: any;
    length?: any;
    deleteAccount?: any;
    getAccount?: any;
    account?: any;
    openEditModal?: any;
    setOpenEditModal?: any;
    updateAccount?: any;
    userId?: any;
    title?: any;
    amount?: any;
    price?: any;
    date?: any;
    time?: any;
    setTime?: any;
    setType?: any;
    setImage?: any;
    errors?: any;
    onLoadMoreHandle?: any;
}

export default function AccountList({
    auth,
    accounts,
    length,
    deleteAccount,
    getAccount,
    account,
    openEditModal,
    setOpenEditModal,
    updateAccount,
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
    onLoadMoreHandle,
}: Props) {
    const getDate = (date: any) => {
        // Replace the space with 'T' to make it ISO 8601 compliant
        const isoTimestamp = date.replace(" ", "T");

        // Parse the timestamp into a Date object
        const newDate = new Date(isoTimestamp) as any;

        // Check if date is valid
        if (isNaN(newDate)) {
            return "Invalid date";
        }

        // Extract the day, month, and year
        const day = newDate.getDate();
        const month = newDate.toLocaleString("en-GB", { month: "long" });
        const year = newDate.getFullYear();

        // Format the date to "23 May, 2025"
        const formattedDate = `${day} ${month}, ${year}`;
        return formattedDate;
    };
    const getTime = (dateString: any) => {
        // Ensure the dateString is in a format that can be understood by new Date()
        const isoTimestamp = dateString.replace(" ", "T");
        const date = new Date(isoTimestamp);

        // Format the date to "2:07:04 PM" using 12-hour format with AM/PM
        const timeString = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        });

        return timeString;
    };
    const getAgoDays = (dateString: any) => {
        if (!dateString) {
            console.error("Invalid or no date string provided");
            return "Invalid date"; // Return a default message or value
        }

        // Replace the space with 'T' to make it ISO 8601 compliant
        const isoTimestamp = dateString.replace(" ", "T");
        const pastDate = new Date(isoTimestamp) as any;

        // Check if the pastDate is valid
        if (isNaN(pastDate.getTime())) {
            console.error("Invalid date string format");
            return "Invalid date"; // Return a default message or value
        }

        const currentDate = new Date() as any;
        const difference = currentDate - pastDate;
        const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

        return daysAgo;
    };
    return (
        <Fragment>
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-3 mb-5">
                {accounts.length > 0 ? (
                    accounts.map((account: any, index: any) => (
                        <div key={index} className="mb-3 ">
                            <Card className="px-10 py-5 sm:flex items-center justify-between">
                                <div className="sm:flex items-center">
                                    <div>
                                        {account.image && (
                                            <img
                                                src={account.image}
                                                className="sm:h-20 h-72 sm:w-20 w-full me-3"
                                                alt="..."
                                            />
                                        )}
                                    </div>
                                    <div className="ms:ps-3 sm:text-start text-center">
                                        <h2 className=" text-lg font-semibold font-serif">
                                            {account.title}
                                        </h2>
                                        <div>{account.amount}</div>
                                        <div>{account.price}tk</div>
                                    </div>
                                </div>
                                <div className="sm:text-start text-center">
                                    {account.type === "expense" ? (
                                        <span className="bg-red-500 px-3 rounded-xl text-white">
                                            exponse
                                        </span>
                                    ) : (
                                        <span className="bg-green-500 px-3 rounded-xl text-white">
                                            Collect
                                        </span>
                                    )}
                                </div>
                                <div className="sm:text-start text-center">
                                    <div>
                                        <b>date:{getDate(account.date_time)}</b>
                                        <br />
                                        <span>
                                            time: {getTime(account.date_time)}
                                        </span>
                                    </div>
                                    <div className="text-center pt-3">
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white p-1 rounded-md"
                                            onClick={() =>
                                                deleteAccount(account.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-green-500 text-white p-1 rounded-md ms-1"
                                            onClick={() =>
                                                getAccount(account.id)
                                            }
                                        >
                                            <EditIcon />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                            <AgoDays account={account} />
                        </div>
                    ))
                ) : (
                    <Card className="text-center">Account list not found</Card>
                )}
                <EditModal
                    auth={auth}
                    setOpenModal={setOpenEditModal}
                    openModal={openEditModal}
                    account={account}
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
                />
            </div>
            {accounts.length !== length ? (
                <div className="text-center mb-10">
                    <button
                        type="button"
                        className=" uppercase bg-[#7EB20F] text-white px-10 py-2 rounded-lg"
                        onClick={() => onLoadMoreHandle(10)}
                    >
                        load more
                    </button>
                </div>
            ) : (
                <div className="text-center mb-10">
                    <button
                        type="button"
                        className=" uppercase bg-[#bed787] text-white px-10 py-2 rounded-lg"
                    >
                        end
                    </button>
                </div>
            )}
        </Fragment>
    );
}
