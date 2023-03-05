import React, { Fragment, useEffect, useState, useMemo, useRef } from 'react';
import { Button, Grid, IconButton, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';

import dayjs from 'dayjs';
import AsyncCitySelector from '../async-city-selector';
import { DateOrNumberInput, ITripInformation, IOriginCity } from '../../types';
import TripDatePicker from '../trip-date-picker';
import PassengersInput from '../passenger-selector';
import parseFormData from '../../helpers/parseFormData';
import { GlobalErrorContext } from '../../context/GlobalErrorContext';
import parseQueryParams from '../../helpers/parseQueryParams';
import isFormComplete from '../../helpers/isFormComplete';

import { IconGroup } from './IconGroup';

import { TripSearchContainer } from './styles';

const TripPlannerForm = () => {
  const [formValues, setFormValues] = useState<ITripInformation>({
    date: null,
    passengers: null,
  });

  const [fields, setFields] = useState<IOriginCity[]>([
    {
      name: 'origin',
      label: 'City of origin',
      value: null,
    },
    {
      name: 'destination',
      label: 'City of destination',
      value: null,
    },
  ]);

  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const [hasGlobalErrors, setHasGlobalErrors] = useState(false);
  const [count, setCount] = useState(5);

  const navigate = useNavigate();
  const didMountRef = useRef(false);
  const [searchParams] = useSearchParams();
  const params = Array.from(searchParams.entries());

  const addValueToArray = (value: string | null, arr: IOriginCity[]) => {
    const targetIndex = arr.length - 1;
    const newItem = {
      name: `city${targetIndex}${Date.now()}`,
      label: 'City of destination',
      value: value || null,
    };

    setCount((prevCount) => prevCount + 5);
    return [...arr.slice(0, targetIndex), arr[targetIndex], newItem];
  };

  useEffect(() => {
    const allFields = parseQueryParams(params);

    const res: ITripInformation = { date: null, passengers: null };
    res.date = allFields.otherFields.date
      ? dayjs(allFields.otherFields.date)
      : null;
    res.passengers = allFields.otherFields.passengers || null;
    setFormValues(res);

    const origin = allFields.cities.shift();
    const destination = allFields.cities.pop();

    if (origin && destination) {
      let newFields: IOriginCity[] = fields.map((field) => {
        if (field.name === 'origin' && origin[1] !== undefined) {
          return { ...field, value: origin[1] };
        }
        if (field.name === 'destination' && destination[1] !== undefined) {
          return { ...field, value: destination[1] };
        }
        return field;
      });

      const intermediateCities = allFields.cities;

      if (intermediateCities?.length <= 2) {
        intermediateCities.forEach((city) => {
          newFields = addValueToArray(city[1], newFields);
        });
      }
      didMountRef.current = true;
      setFields(newFields);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      handleGlobalError: (name: string) => {
        setGlobalErrors((prev) =>
          prev.includes(name) ? prev : prev.concat(name),
        );
      },
      dismissGlobalError: (name: string) => {
        const newErrors = globalErrors.filter(
          (errorName) => errorName !== name,
        );
        setGlobalErrors(newErrors);
      },
      hasGlobalErrors,
    }),
    [globalErrors, hasGlobalErrors],
  );

  useEffect(() => {
    setHasGlobalErrors(false);
  }, [globalErrors.length]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setHasGlobalErrors(true);

    if (globalErrors.length || !isFormComplete(formValues, fields)) return;

    if (didMountRef.current || isFormComplete(formValues, fields)) {
      const processed = parseFormData(formValues, fields);

      navigate({
        pathname: '/trip-summary',
        search: `?${createSearchParams(processed)}`,
      });
    }
  };

  const handleOtherData = (name: string, value: DateOrNumberInput) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCitiesData = (name: string, value: string | null) => {
    const newFields = fields.map((field) => {
      if (field.name === name) {
        return { ...field, value };
      }
      return field;
    });
    setFields(newFields);
  };

  <IconGroup count={5} />;

  const handleRemoveField = (name: string) => {
    const newFields = fields.filter((field) => field.name !== name);
    setFields(newFields);
    contextValue.dismissGlobalError(name);

    setCount((prevCount) => {
      const newCount = prevCount - 5;
      return newCount < 0 ? 0 : newCount;
    });
  };

  const handleAddField = (
    value: string | null,
    fieldsArr: IOriginCity[] = fields,
  ) => {
    const newArr = addValueToArray(value, fieldsArr);
    setFields(newArr);
  };
  const renderPlaceInput = (
    name: string,
    label: string,
    initialValue: string | null,
    index: number,
  ) => (
    <Fragment key={name}>
      <Grid item xs={12} key={name} sx={{ position: 'relative' }}>
        <AsyncCitySelector
          name={name}
          label={label}
          setFormField={handleCitiesData}
          initialValue={initialValue}
        />
        {index !== 0 && index !== fields.length - 1 && (
          <IconButton
            aria-label='delete'
            onClick={() => handleRemoveField(name)}
            className='delete-btn'
          >
            <ClearIcon />
          </IconButton>
        )}
      </Grid>
    </Fragment>
  );

  return (
    <GlobalErrorContext.Provider value={contextValue}>
      <TripSearchContainer elevation={0}>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container mb={5} className='icon-grid-container'>
            <Grid item xs={1} className='icon-grid'>
              <IconGroup count={count} />
            </Grid>

            <Grid item xs={7} className='origin-grid'>
              {fields.map((field, index: number) => (
                <div style={{ marginBottom: 46 }}>
                  {renderPlaceInput(
                    field.name,
                    field.label,
                    field.value,
                    index,
                  )}
                </div>
              ))}
              <Grid item xs={12}>
                <Button
                  sx={{ color: '#7786D2', textTransform: 'initial' }}
                  variant='text'
                  type='button'
                  onClick={() => handleAddField(null)}
                  className='add-destionation-btn'
                >
                  <AddIcon />
                  Add destination
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={2.3} className='passenger-date-grid'>
              <Grid container spacing={3}>
                <Grid item xs={12} className='passengners-label'>
                  <InputLabel shrink htmlFor='my-input'>
                    Passengers
                  </InputLabel>
                  <PassengersInput
                    name='passengers'
                    setFormField={handleOtherData}
                    initialValue={formValues?.passengers}
                  />
                </Grid>
                <Grid item xs={12} className='date-label'>
                  <InputLabel shrink htmlFor='my-input'>
                    Date
                  </InputLabel>
                  <TripDatePicker
                    name='date'
                    setFormField={handleOtherData}
                    initialValue={formValues?.date}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              type='submit'
              disabled={!!globalErrors.length}
              className='submit-trip-btn'
            >
              Submit
            </Button>
          </Grid>
        </form>
      </TripSearchContainer>
    </GlobalErrorContext.Provider>
  );
};
export default TripPlannerForm;
