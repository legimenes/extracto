import Expression from "./Expression";

export default class Activity {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly operation: string
  ) {
    this.patterns = [];
    this.expressions = [];
  }
  private patterns: string[];
  private expressions: Expression[];

  static create(
    name: string,
    operation: string
  ) {
    return new Activity(0, name, operation);
  }
  
  public addPattern(pattern: string): void {
    this.patterns.push(pattern);
  }
  
  public getPatterns(): string[] {
    return this.patterns;
  }

  public addExpression(expression: Expression): void {
    this.expressions.push(expression);
  }

  public getExpressions(): Expression[] {
    return this.expressions;
  }
}