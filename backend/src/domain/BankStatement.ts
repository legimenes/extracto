import BankStatementEntry from "@domain/BankStatementEntry";

export default class BankStatement {
  constructor(
    readonly entries: BankStatementEntry[]
  ) {
  }
}