import { PageOptions } from "./PageOptions";

export class Pageable {
  constructor(
    private page: number,
    private size: number,
    private sortBy: string[] = [],
    private sortDesc: boolean[] = []
  ) {}

  static of(options: PageOptions): Pageable {
    // page - 1 because vuetity page start at 1 and spring data start at 0
    const pageNumber = options.page - 1;

    return new Pageable(
      pageNumber,
      options.itemsPerPage,
      options.sortBy,
      options.sortDesc
    );
  }

  toQueryParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append("page", this.page.toString());
    params.append("size", this.size.toString());
    if (this.sortDesc[0] == true){
      const sortOrder = "desc"
      params.append("sort", `${this.sortBy},${sortOrder}`);
    }
    else{
      const sortOrder = "asc"
      params.append("sort", `${this.sortBy},${sortOrder}`);
    }
    

    return params;
  }
}
