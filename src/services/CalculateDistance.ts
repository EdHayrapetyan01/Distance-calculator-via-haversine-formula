import { CityTuple } from '../types';
import delay from '../helpers/delay';

const toRadian = (angle: number) => (Math.PI / 180) * angle;
const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
const RADIUS_OF_EARTH_IN_KM = 6371;

const calculateDistance = async (
  origin: CityTuple | undefined,
  destination: CityTuple | undefined,
) => {
  if (!origin || !destination) {
    throw new Error('Invalid or missing parameters provided');
  }

  const [originCity, originLat, originLon] = origin;
  const [destinationCity, destinationLat, destinationLon] = destination;
  
  await delay(500);
  
  const deltaLat = distance(destinationLat, originLat);
  const deltaLon = distance(destinationLon, originLon);
  
  const originLatRadians = toRadian(originLat);
  const destinationLatRadians = toRadian(destinationLat);
  
  const centralAngle =
    Math.sin(deltaLat / 2) ** 2 +
    Math.sin(deltaLon / 2) ** 2 * Math.cos(originLatRadians) * Math.cos(destinationLatRadians);
  const greatCircleDistance = 2 * Math.asin(Math.sqrt(centralAngle));
  
  return {
    origin: originCity,
    destination: destinationCity,
    distance: Math.round(RADIUS_OF_EARTH_IN_KM * greatCircleDistance),
  };
};

export default calculateDistance;
