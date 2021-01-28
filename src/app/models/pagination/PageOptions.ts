export class PageOptions {
  constructor(
    public page: number,
    public itemsPerPage: number,
    public sortBy: string[],
    public sortDesc: boolean[]
  ) {}
}
