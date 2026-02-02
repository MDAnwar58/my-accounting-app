import React from "react";
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    parseISO,
} from "date-fns";

export default function AgoDays({ account }: { account?: any }) {
    const getAgoDetails = (dateString: any) => {
        if (!dateString) {
            console.error("Invalid or no date string provided");
            return "Invalid date"; // Return a default message or value
        }

        try {
            // Replace the space with 'T' to make it ISO 8601 compliant
            const isoTimestamp = dateString.replace(" ", "T");
            const pastDate = parseISO(isoTimestamp);
            const currentDate = new Date();

            const daysAgo = differenceInDays(currentDate, pastDate);
            const hoursAgo = differenceInHours(currentDate, pastDate);
            const minutesAgo = differenceInMinutes(currentDate, pastDate);

            return {
                daysAgo,
                hoursAgo: hoursAgo - daysAgo * 24, // Subtract the hours already counted in days
                minutesAgo: minutesAgo - hoursAgo * 60 - daysAgo * 24 * 60, // Subtract the minutes already counted in hours and days
            };
        } catch (error) {
            console.error("Error parsing date string:", error);
            return "Invalid date";
        }
    };
    const details = getAgoDetails(account.date_time) as any;
    const { daysAgo, hoursAgo, minutesAgo } = details;

    let agoDaysAndHours = "No date provided";
    if (account.date_time) {
        agoDaysAndHours = `${
            daysAgo > 0 ? `${daysAgo}days` : ""
        } ${hoursAgo}hours ${minutesAgo}minutes ago`;
    }
    return <p className="text-end">{agoDaysAndHours}</p>;
}
