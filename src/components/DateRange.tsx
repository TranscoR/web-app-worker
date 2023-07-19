import React from "react";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface DateRange {
  selectionRange: any;
  setSelectionRange: any;
}

export const DateRange = ({ selectionRange, setSelectionRange }: DateRange) => {
  const handleSelect = (date: any) => {
    setSelectionRange({ ...date.selection });
  };

  return (
    <div>
      <DateRangePicker
        inputRanges={[]}
        locale={locales["es"]}
        ranges={[selectionRange]}
        onChange={handleSelect}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        renderStaticRangeLabel={() => null}
        staticRanges={[]}
        showPreview={false}
      />
    </div>
  );
};
