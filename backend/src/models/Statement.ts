export default class Statement {
  constructor(
    readonly activityId: number,
    readonly activityName: string,
    readonly entry: string,
    readonly date: Date,
    readonly value: number
  ) {
  }
}