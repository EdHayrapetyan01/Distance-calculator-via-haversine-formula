import { getUniqueCity } from '../services/fetchCitiesByQuery';
import CalculateDistance from '../services/CalculateDistance';
import fetchCities from './fetchCities';

type ICity = {
  currentCityName: string,
  previousCityName: string,
}

const calculateDistance = async ({ currentCityName, previousCityName }: ICity) => {
  const origin = await getUniqueCity(previousCityName);
  const destination = await getUniqueCity(currentCityName);

  return CalculateDistance(origin, destination);
};

const calculateDistances = async (parameters: [string, string][]) => {
  if (!parameters?.length || parameters.some(([cityName]) => !cityName)) {
    throw new Error('Invalid parameters supplied');
  }

  const citiesFromParams = fetchCities(parameters);

  const newDistances = citiesFromParams.slice(1).map((city, index) =>
    calculateDistance({
      currentCityName: city,
      previousCityName: citiesFromParams[index],
    })
  );

  return Promise.all(newDistances);
};

export default calculateDistances;
