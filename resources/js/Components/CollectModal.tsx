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
    addAccountCollect?: any;
    userId?: any;
    title?: any;
    price?: any;
    date?: any;
    time?: any;
    setTime?: any;
    setType?: any;
    errors?: any;
}

export default function CollectModal({
    auth,
    setOpenModal,
    openModal,
    addAccountCollect,
    userId,
    title,
    price,
    date,
    time,
    setTime,
    setType,
    errors,
}: Props) {
    return (
        <Modal
            onClose={() => setOpenModal(false)}
            show={openModal}
            maxWidth="md"
        >
            <form onSubmit={addAccountCollect}>
                <div className="modal-header flex justify-between p-5">
                    <h2 className="">আয় জমা করুন</h2>
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
                        <Input
                            type="text"
                            className="w-full"
                            inputRef={title}
                        />
                        {errors.title && (
                            <span className="text-red-500">{errors.title}</span>
                        )}
                    </div>
                    {/* <div className="mb-3">
                        <InputLabel>পরিমাণ</InputLabel>
                        <TextInput
                            className="w-full"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                        />
                    </div> */}
                    <div className="mb-3">
                        <InputLabel>
                            টাকা <small className="text-red-500">*</small>
                        </InputLabel>
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
                        <InputLabel>
                            তারিখ <small className="text-red-500">*</small>
                        </InputLabel>
                        <Input type="date" className="w-full" inputRef={date} />
                        {errors.date && (
                            <span className="text-red-500">{errors.date}</span>
                        )}
                    </div>
                    <div>
                        <InputLabel>সময়</InputLabel>
                        {/* <Input type="time" className="w-full" inputRef={time} /> */}
                        <TimePicker
                            onChange={setTime}
                            value={time}
                            secondAriaLabel="Second"
                        />
                        {errors.time && (
                            <span className="text-red-500">{errors.time}</span>
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
                        value="collect"
                        onClick={(e: any) => setType(e.target.value)}
                    >
                        add
                    </button>
                </div>
            </form>
        </Modal>
    );
}
