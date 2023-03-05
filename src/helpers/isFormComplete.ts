import { ITripInformation, IOriginCity } from '../types';

const isFormComplete = (
  tripInformation: ITripInformation,
  originCities: IOriginCity[],
) => {
  const hasCompleteInformation = Object.values(tripInformation).filter(Boolean).length;
  const hasValidCities = originCities.every((city) => !!city.value);

  return hasCompleteInformation && hasValidCities;
};

export default isFormComplete;