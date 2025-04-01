import { Activity } from "./Activity";

export interface AccountStatement {
  selected: boolean,
  id: number;
  activities: Activity[];
  statementEntry: string;
  date: Date;
  value: number;
}