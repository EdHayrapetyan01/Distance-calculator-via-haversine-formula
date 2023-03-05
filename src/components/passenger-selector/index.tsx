import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { DateOrNumberInput } from '../../types';
import { GlobalErrorContext } from '../../context/GlobalErrorContext';
import { Remove, Add } from '@mui/icons-material';
import { PassengerSelectorStyled, ErrorMessage } from './styles';

interface PassengnerInputProps {
  name: string;
  setFormField: (name: string, value: DateOrNumberInput) => void;
  initialValue: string | null;
}

const PassengnerSelector = ({
  name,
  setFormField,
  initialValue,
}: PassengnerInputProps) => {
  const [passengers, setPassengers] = React.useState<number | string>(0);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const didMountRef = useRef(false);

  const { handleGlobalError, dismissGlobalError, hasGlobalErrors } =
    useContext(GlobalErrorContext);

  useEffect(() => {
    if (initialValue) {
      setPassengers(String(initialValue));
    }
  }, [initialValue]);

  useEffect(() => {
    setFormField(name, Number(passengers));
  }, [passengers]);

  useEffect(() => {
    if (hasGlobalErrors) {
      didMountRef.current = true;
    }
  }, [hasGlobalErrors]);

  useEffect(() => {
    if (error) {
      handleGlobalError(name);
      setErrorText('Select passengers');
    } else if (didMountRef.current) {
      dismissGlobalError(name);
      setErrorText('');
    }
  }, [error]);

  useEffect(() => {
    if ((!passengers || Number(passengers) <= 0) && didMountRef.current) {
      setError(true);
    } else {
      setError(false);
      setFormField(name, Number(passengers));
    }

    didMountRef.current = true;
  }, [passengers, hasGlobalErrors]);

  return (
    <PassengerSelectorStyled>
      <FormControl fullWidth>
        <TextField
          name={name}
          error={error}
          type='string'
          size='small'
          required
          InputProps={{
            startAdornment: (
              <InputAdornment
                className='passenger-input-adornment'
                position='start'
              >
                <IconButton
                  sx={{ width: 21 }}
                  size='small'
                  aria-label='remove'
                  onClick={() => setPassengers(Number(passengers) - 1)}
                  disabled={Number(passengers) <= 0}
                >
                  <Remove />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                className='passenger-input-adornment'
                position='end'
              >
                <IconButton
                  sx={{ width: 21 }}
                  size='small'
                  aria-label='add'
                  onClick={() => setPassengers(Number(passengers) + 1)}
                >
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              style: { textAlign: 'center' },
            },
          }}
          value={passengers}
          onChange={(event) => setPassengers(event.target.value)}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </FormControl>
      <ErrorMessage>{error ? errorText : ''}</ErrorMessage>
    </PassengerSelectorStyled>
  );
};

export default PassengnerSelector;
