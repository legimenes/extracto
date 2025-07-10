export default class Expression {
  constructor(
    readonly id: number,
    readonly activityId: number,
    readonly pattern: string
  ) {
  }
  
  static create(
    activityId: number,
    pattern: string) {
    return new Expression(0, activityId, pattern);
  }
}
