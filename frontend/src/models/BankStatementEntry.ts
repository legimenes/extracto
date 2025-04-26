import { Activity } from "./Activity";

export interface BankStatementEntry {
  selected: boolean,
  id: number;
  activities: Activity[];
  memo: string;
  date: Date;
  value: number;
}