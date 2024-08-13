import React from "react";
import Modal from "./Modal";
import { CrossIcon } from "./Icons";
import InputLabel from "./InputLabel";
import Input from "./Input";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface Props {
    auth?: any;
    setOpenModal?: any;
    openModal?: any;
    addExpenseCollect?: any;
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

export default function ExpenseModal({
    auth,
    setOpenModal,
    openModal,
    addExpenseCollect,
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
    return (
        <Modal
            onClose={() => setOpenModal(false)}
            show={openModal}
            maxWidth="md"
        >
            <form onSubmit={addExpenseCollect}>
                <div className="modal-header flex justify-between p-5">
                    <h2 className="">খরচ জমা করুন</h2>
                    <button
                        type="button"
                        className="text-[#b20f4d] hover:text-white hover:bg-[#b20f4d] transition-all border border-[#b20f4d] rounded-md px-1"
                        onClick={() => setOpenModal(false)}
                    >
                        <CrossIcon />
                    </button>
                </div>
                <div className="px-5">
                    <Input
                        type="hidden"
                        inputRef={userId}
                        defaultValue={auth.user.id}
                    />
                    <div className="mb-3">
                        <InputLabel>বিষয়</InputLabel>
                        <Input className="w-full" inputRef={title} />
                        {errors.title && (
                            <span className="text-red-500">{errors.title}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputLabel>পরিমাণ</InputLabel>
                        <Input className="w-full" inputRef={amount} />
                        {errors.amount && (
                            <span className="text-red-500">
                                {errors.amount}
                            </span>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputLabel>টাকা</InputLabel>
                        <Input
                            type="number"
                            className="w-full"
                            inputRef={price}
                        />
                        {errors.price && (
                            <span className="text-red-500">{errors.price}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputLabel>তারিখ</InputLabel>
                        <Input type="date" className="w-full" inputRef={date} />
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
                    <div>
                        <InputLabel>pic</InputLabel>
                        <Input
                            type="file"
                            className="w-full"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {errors.image && (
                            <span className="text-red-500">{errors.image}</span>
                        )}
                    </div>
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
                        value="expense"
                        onClick={(e) => setType(e.target.value)}
                    >
                        add
                    </button>
                </div>
            </form>
        </Modal>
    );
}
