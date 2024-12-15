export default class EntryActivity {
  constructor(
    readonly activityId: number,
    readonly activityName: string,
    readonly operation: string,
    readonly patterns: string[]
  ) {
  }
}
