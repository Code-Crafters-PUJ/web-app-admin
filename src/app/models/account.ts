export class Account {
  constructor(
    public name: string,
    public lastName: string,
    public documentNumber: number,
    public roles: string[],
    public lastConected: Date,
    public lastReport: Date
  ) {}
}
