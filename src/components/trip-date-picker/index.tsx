import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateOrNumberInput } from '../../types';
import { GlobalErrorContext } from '../../context/GlobalErrorContext';

import { ErrorMessage} from './styles';

interface DatePickerProps {
  name: string;
  setFormField: (name: string, value: DateOrNumberInput) => void;
  initialValue: Dayjs | null;
}

const TripDatePicker = ({
  name,
  setFormField,
  initialValue,
}: DatePickerProps) => {
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs(null));

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const didMountRef = useRef(false);

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const { handleGlobalError, dismissGlobalError, hasGlobalErrors } =
    useContext(GlobalErrorContext);

  useEffect(() => {
    if (initialValue) {
      setDateValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (hasGlobalErrors) {
      didMountRef.current = true;
    }
  }, [hasGlobalErrors]);

  useEffect(() => {
    if (error) {
      setErrorMessage('Select a future date')
      handleGlobalError(name);
    } else if (didMountRef.current) {
      dismissGlobalError(name);
      setErrorMessage('')
    }
  }, [error]);

  useEffect(() => {
    const isInvalid =
      dateValue === null ||
      !dateValue?.isValid() ||
      !dateValue?.isAfter(dayjs());

    if (isInvalid && didMountRef.current) {
      setError(true);
    } else {
      setError(false);
      setFormField(name, dateValue);
    }

    didMountRef.current = true;
  }, [dateValue, hasGlobalErrors]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputFormat='MM/DD/YYYY'
        value={dateValue}
        minDate={dayjs().add(1, 'day')}
        onError={(reason) => {
          setError(!!reason);
        }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={(newValue: Dayjs | null) => setDateValue(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            fullWidth
            required
            error={error}
            name='date'
            onClick={handleOpen}
            InputProps={{
              endAdornment: null,
            }}
          />
        )}
      />
        <ErrorMessage>
        {error ? errorMessage : ''}
        </ErrorMessage>
    </LocalizationProvider>
  );
};

export default TripDatePicker;
