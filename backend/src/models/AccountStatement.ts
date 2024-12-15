import EntryActivity from "./EntryActivity";

export default class AccountStatement {
  constructor(
    readonly activities: EntryActivity[] | undefined,
    readonly statementEntry: string,
    readonly date: Date,
    readonly value: number
  ) {
  }
}
