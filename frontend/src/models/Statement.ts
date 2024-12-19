import Activity from "./activity";

export default interface Statement {
  selected: boolean,
  id: number;
  activities: Activity[];
  statementEntry: string;
  date: Date;
  value: number;
}