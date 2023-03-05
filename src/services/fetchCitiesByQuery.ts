import cities from '../constants/cityList';
import delay from '../helpers/delay';

type CityType = [string, number, number];

export const fetchCitiesByQuery = async (
  query: string,
): Promise<CityType[]> => {
  await delay(1000);

  return cities.filter((city) =>
    city[0].toLowerCase().includes(query.toLowerCase()),
  );
};

export const getUniqueCity = async (name: string): Promise<CityType> => {
  await delay(1000);

  if (name.toLowerCase() === 'dijon') {
    throw new Error('Oops! Something went wrong!');
  }

  const foundCity = cities.find(
    (city) => city[0].toLowerCase() === name.toLowerCase(),
  );

  if (!foundCity) {
    throw new Error('No Options');
  }

  return foundCity;
};
