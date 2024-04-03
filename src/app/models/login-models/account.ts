export class Account {
    constructor(
      public name: string,
      public lastName: string,
      public documentNumber: number,
      public role: string,
      public lastConected: Date,
      public lastReport: Date,
      public jwt: string
    ) {}
  }
