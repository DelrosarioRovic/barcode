import DatePicker from "react-datepicker";
import { useState, forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Calender = ({
  startDate,
  setStartDate,
  isDefaultDate,
  setIsDefaultDate,
  setSearch,
  setSortType,
}) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input bg-blue-500 text-white px-3 py-1 rounded-sm"
      onClick={onClick}
      ref={ref}
    >
      {isDefaultDate ? value : "Select Date"}
    </button>
  ));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => (
        setStartDate(date), setIsDefaultDate(true), setSortType(false), setSearch("")
      )}
      customInput={<ExampleCustomInput />}
    />
  );
};

export default Calender;
