import React from "react";
import Modal from "./Modal";
import { CrossIcon } from "./Icons";
import InputLabel from "./InputLabel";
import Input from "./Input";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { log } from "console";

interface Props {
    auth?: any;
    setOpenModal?: any;
    openModal?: any;
    account?: any;
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
}

export default function EditModal({
    auth,
    setOpenModal,
    openModal,
    account,
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
}: Props) {
    const getTimeFromDatetime = (dateString: any) => {
        if (!dateString) {
            // console.error("Invalid or no date string provided");
            return { Date: "Invalid date", Time: "Invalid time" }; // Return default messages or values
        }

        try {
            // Split the dateString to separate date and time
            const [datePart, timePart] = dateString.split(" ");

            // Validate that both parts exist
            if (!datePart || !timePart) {
                // console.error("Invalid date string format");
                return { Date: "Invalid date", Time: "Invalid time" }; // Return default messages or values
            }

            return { Date: datePart, Time: timePart };
        } catch (error) {
            // console.error("Error processing date string:", error);
            return { Date: "Invalid date", Time: "Invalid time" }; // Return default messages or values
        }
    };
    const { Date } = getTimeFromDatetime(account.date_time);
    return (
        <Modal
            onClose={() => setOpenModal(false)}
            show={openModal}
            maxWidth="md"
        >
            <form onSubmit={(e) => updateAccount(e, account.id)}>
                <div className="modal-header flex justify-between p-5">
                    <h2 className="">খরচ জমা করুন edit</h2>
                    <button
                        type="button"
                        className="text-[#b20f4d] hover:text-white hover:bg-[#b20f4d] transition-all border border-[#b20f4d] rounded-md px-1"
                        onClick={() => setOpenModal(false)}
                    >
                        <CrossIcon />
                    </button>
                </div>
                <Input
                    className="w-full hidden"
                    inputRef={userId}
                    defaultValue={auth.user.id}
                />
                <div className="px-5">
                    <div className="mb-3">
                        <InputLabel>বিষয়</InputLabel>
                        <Input
                            className="w-full"
                            inputRef={title}
                            defaultValue={account.title}
                        />
                        {errors.title && (
                            <span className="text-red-500">{errors.title}</span>
                        )}
                    </div>
                    {account.type === "expense" && (
                        <div className="mb-3">
                            <InputLabel>পরিমাণ</InputLabel>
                            <Input
                                className="w-full"
                                inputRef={amount}
                                defaultValue={account.amount}
                            />
                            {errors.amount && (
                                <span className="text-red-500">
                                    {errors.amount}
                                </span>
                            )}
                        </div>
                    )}
                    <div className="mb-3">
                        <InputLabel>
                            টাকা <small className="text-red-500">*</small>
                        </InputLabel>
                        <Input
                            type="number"
                            className="w-full"
                            inputRef={price}
                            defaultValue={account.price}
                        />
                        {errors.price && (
                            <span className="text-red-500">{errors.price}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputLabel>
                            তারিখ <small className="text-red-500">*</small>
                        </InputLabel>
                        <Input
                            type="date"
                            className="w-full"
                            inputRef={date}
                            defaultValue={Date}
                        />
                        {errors.date && (
                            <span className="text-red-500">{errors.date}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputLabel>সময়</InputLabel>
                        <TimePicker
                            onChange={setTime}
                            value={time}
                            secondAriaLabel="Second"
                        />
                        {errors.time && (
                            <span className="text-red-500">{errors.time}</span>
                        )}
                    </div>
                    {account.type === "expense" && (
                        <div>
                            <InputLabel>pic</InputLabel>
                            <Input
                                type="file"
                                className="w-full"
                                onChange={(e: any) =>
                                    setImage(e.target.files[0])
                                }
                            />
                            {errors.image && (
                                <span className="text-red-500">
                                    {errors.image}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className="modal-footer flex justify-end gap-1 p-5">
                    <button
                        type="button"
                        className=" bg-red-500 text-white capitalize px-5 py-1 rounded-lg"
                        onClick={() => setOpenModal(false)}
                    >
                        বাতিল
                    </button>
                    <button
                        type="submit"
                        className=" bg-[#7eb20f] text-white capitalize px-5 py-1 rounded-lg"
                        value={account.type}
                        onClick={(e: any) => setType(e.target.value)}
                    >
                        update
                    </button>
                </div>
            </form>
        </Modal>
    );
}
