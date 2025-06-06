import { Activity } from "./Activity";

export interface Entry {
  selected: boolean,
  id: number;
  activities: Activity[];
  memo: string;
  date: Date;
  value: number;
}