import { Dayjs } from 'dayjs';

export type CityTuple = [string, number, number];

export type DateOrNumberInput = Dayjs | number | null;
export interface IOriginCity {
  name: string;
  label: string;
  value: string | null;
}
export interface ITripInformation {
  date: Dayjs | null;
  passengers: string | null;
}
export interface DistanceData {
  origin: string;
  destination: string;
  distance: number;
}
export interface ErrorHandlingContext {
  handleGlobalError: (name: string) => void;
  dismissGlobalError: (name: string) => void;
  hasGlobalErrors: boolean;
}
