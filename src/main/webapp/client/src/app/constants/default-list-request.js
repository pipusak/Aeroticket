"use strict";
var sort_direction_1 = require("../model/sort-direction");
exports.defaultListRequest = {
    sorting: {
        fieldName: 'id',
        direction: sort_direction_1.SortDirection.Asc
    },
    pageNumber: 0
};
