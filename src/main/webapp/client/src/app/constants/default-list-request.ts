import {ListRequest} from "../model/list-request";
import {SortDirection} from "../model/sort-direction";
export const defaultListRequest: ListRequest = {
  sorting: {
    fieldName: 'id',
    direction: SortDirection.Asc
  },
  pageNumber: 0
};
