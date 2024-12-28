import { DatePicker, Flex, Form } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import CalenderIcon from "@Assets/icons/calendar.svg";
import DashIcon from "@Assets/icons/dashIcon.svg";
import { dateFormats } from "@Constants/app";

const CustomDatePicker = ({
    updateEndDate = (date) => {},
    updateStartDate = (date) => {},
    startDate,
    endDate,
    placeholder = "Start Date",
    className = "",
    inputCustomClass = " "
}) => {
    const [startDateKey, setStartDateKey] = useState(0);
    const [endDateKey, setEndDateKey] = useState(0);
    const handleStartDateChange = (date) => {
        updateStartDate(date);
        if (endDate && date && dayjs(date).isAfter(endDate, "day")) {
            updateEndDate(null);
        }
    };

    const handleEndDateChange = (date) => {
        updateEndDate(date);
    };

    React.useEffect(() => {
        if (startDate === null) {
            setStartDateKey((startDateKey) => startDateKey + 1);
        }
    }, [startDate, endDateKey]);

    return (
        <Flex className={`h-[44px] ${className}`}>
            <Form.Item name="startDate">
                <DatePicker
                    key={startDateKey}
                    format={dateFormats.US_DATE_FORMAT_SLASH}
                    suffixIcon={<CalenderIcon />}
                    className={`cursor-pointer h-[44px] rounded-lg ${inputCustomClass}`}
                    placeholder={"Start Date"}
                    onChange={handleStartDateChange}
                    value={startDate}
                />
            </Form.Item>
            <div className="flex  items-center justify-center">
                <DashIcon className="mx-2 " />
            </div>
            <Form.Item name="endDate">
                <DatePicker
                    key={startDateKey}
                    suffixIcon={<CalenderIcon />}
                    className={`cursor-pointer    h-[44px] rounded-lg ${inputCustomClass}`}
                    placeholder={"End Date"}
                    onChange={handleEndDateChange}
                    minDate={startDate}
                    disabled={!startDate}
                    value={endDate}
                    format={dateFormats.US_DATE_FORMAT_SLASH}
                />
            </Form.Item>
        </Flex>
    );
};

export default CustomDatePicker;
