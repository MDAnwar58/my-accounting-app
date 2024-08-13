import React from "react";

interface Props {
    onSearchHanlde?: any;
}

export default function FilterAndSearch({ onSearchHanlde }: Props) {
    return (
        <div className="sm:flex items-end justify-between text-center max-w-7xl mx-auto lg:px-8 sm:px-6 px-3 pb-3">
            <div className="flex sm:justify-normal justify-center sm:pb-0 pb-3">
                <div className="text-start">
                    <label htmlFor="start_date">Start Date</label>
                    <div>
                        <input
                            type="date"
                            className="border border-gray-300 h-9"
                        />
                    </div>
                </div>
                <div className="text-start">
                    <label htmlFor="end_date">Start End</label>
                    <div>
                        <input
                            type="date"
                            className="border border-gray-300 ms-1 h-9"
                        />

                        <button
                            type="button"
                            className="bg-[#7EB20F] text-white px-3 h-9"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>
            <input
                type="search"
                className=" h-8 rounded-lg"
                onChange={onSearchHanlde}
            />
        </div>
    );
}
