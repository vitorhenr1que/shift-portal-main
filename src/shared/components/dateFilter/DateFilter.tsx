import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { UiTextField } from './styles';

interface IDateFilterProps {
  startDate: string,
  endDate: string,
  onChange: (value: any, name: string) => void
}

export const DateFilter: React.FC<IDateFilterProps> = ({ startDate, endDate, onChange }) => {
  // const [startDate, setStartDate] = React.useState(dayjs().format('YYYY-MM-DD'));
  // const [endDate, setEndDate] = React.useState(dayjs().format('YYYY-MM-DD'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
      <DesktopDatePicker
        label='Data Inicial'
        value={startDate}
        onChange={(newValue) => onChange(newValue, 'startDate')}
        renderInput={(params) => <UiTextField  {...{
          ...params,
          label: 'Data Inicial',
          name: 'startDate',
          variant: 'outlined',
          multiline: false,
          size: 'small'
        }} />}
      />
      <DesktopDatePicker
        label='Data Final'
        value={endDate}
        onChange={(newValue) => onChange(newValue, 'endDate')}
        renderInput={(params) => <UiTextField  {...{
          ...params,
          label: 'Data Final',
          name: 'endDate',
          variant: 'outlined',
          multiline: false,
          size: 'small'
        }} />}
      />
    </LocalizationProvider>
  );
}

export default DateFilter