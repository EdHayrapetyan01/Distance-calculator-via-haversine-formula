import { DistanceData } from '../types';

const calculateTotalDistance = (distanceEntries: DistanceData[]) =>
  distanceEntries.reduce((acc: number, item) => acc + item.distance, 0);

export default calculateTotalDistance;
