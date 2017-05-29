import {SortParameter} from "./sort-parameter";
export interface ListRequest {
  sorting: SortParameter;
  pageNumber: number;
}
