export default class Activity {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly operation: string
  ) {
    this.patterns = [];
  }
  private patterns: string[];

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
}