import React from 'react';
import DatePickerLib from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.scss';

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  id?: string;
  minDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({ selected, onChange, required, id, minDate }) => {
  return (
    <DatePickerLib
      selected={selected}
      onChange={onChange}
      className={styles.datePicker}
      dateFormat="dd.MM.yyyy"
      placeholderText="Выберите дату"
      required={required}
      locale="ru"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      id={id}
      minDate={minDate}
    />
  );
};
