export class Content<T> {
    constructor(
      public content: T[],
      public numberFiles: number,
      public path: string,
    ) {}
  }
  