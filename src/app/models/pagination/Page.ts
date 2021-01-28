export class Page<T> {
  constructor(
    public content: T[],
    public totalUsers: number,
    public totalPages: number,
    public size: number,
  ) {}
}
