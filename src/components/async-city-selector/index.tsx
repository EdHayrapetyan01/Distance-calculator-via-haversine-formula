import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  InputLabel,
} from '@mui/material';
import { fetchCitiesByQuery } from '../../services/fetchCitiesByQuery';
import { GlobalErrorContext } from '../../context/GlobalErrorContext';

import { CitySelectorStyled, ErrorMessage } from './styles';

interface citySelectorProps {
  name: string;
  label: string;
  setFormField: (name: string, value: string | null) => void;
  initialValue: string | null;
}

const AsyncCitySelector = ({
  name,
  label,
  setFormField,
  initialValue,
}: citySelectorProps) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const didMountRef = useRef(false);

  const { handleGlobalError, dismissGlobalError, hasGlobalErrors } =
    useContext(GlobalErrorContext);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (hasGlobalErrors) {
      didMountRef.current = true;
    }
  }, [hasGlobalErrors]);

  useEffect(() => {
    if (inputValue.length > 0) {
      setIsLoading(true);
      fetchCitiesByQuery(inputValue)
        .then((data) => {
          setOptions(data.map((el) => el[0]));
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [inputValue]);

  useEffect(() => {
    if (value === null && didMountRef.current) {
      setError(new Error('This field is required'));
      handleGlobalError(name);
    } else if (didMountRef.current) {
      dismissGlobalError(name);
      setError(null);
      setFormField(name, value);
    }

    didMountRef.current = true;
  }, [value, hasGlobalErrors]);

  return (
    <CitySelectorStyled>
      <Autocomplete
        loading={isLoading}
        id={name}
        value={value}
        inputValue={inputValue}
        selectOnFocus
        clearOnBlur
        onChange={(e: React.SyntheticEvent, newValue: string | null) => {
          setValue(newValue);
        }}
        onInputChange={(e, v) => setInputValue(v)}
        size='small'
        options={options}
        renderInput={(params) => (
          <>
            <InputLabel shrink htmlFor='my-input'>
              {label}
            </InputLabel>
            <TextField
              {...params}
              required
              error={!!error}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading && inputValue.length && !value ? (
                      <CircularProgress color='secondary' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
            <ErrorMessage>{error ? error?.message : ''}</ErrorMessage>
          </>
        )}
      />
    </CitySelectorStyled>
  );
};

export default AsyncCitySelector;
