import dayjs from 'dayjs';
import { DateOrNumberInput, ITripInformation, IOriginCity } from '../types';

const parseFormData = (
  formValues: ITripInformation,
  cityFields: IOriginCity[],
) => {
  const newFormValues = Object.entries(formValues).map(
    (el: [string, DateOrNumberInput]): [string, string] => {
      const [name, value] = el;

      if (name === 'date') {
        const date = dayjs.isDayjs(value) ? value.format('YYYY/MM/DD') : '';
        return [name, date];
      }
      return [name, String(value)];
    },
  );

  const newCityFields = cityFields.map((city, index): [string, string] => {
    const name = `city_${index}`;
    const value = city.value || '';
    return [name, value];
  });

  return newFormValues.concat(newCityFields);
};

export default parseFormData;
