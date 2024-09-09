"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        // Filtering
        const excludeFields = ["searchTerm", "sort", "limit", "page"];
        excludeFields.forEach((el) => delete queryObj[el]);
        if (queryObj.minPrice && queryObj.maxPrice) {
            this.modelQuery = this.modelQuery.find({
                pricePerHour: { $gte: queryObj.minPrice, $lte: queryObj.maxPrice },
            });
        }
        else {
            this.modelQuery = this.modelQuery.find(queryObj);
        }
        return this;
    }
    sort() {
        var _a, _b;
        const sort = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort;
        const sortDirection = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sort) || "asc";
        if (sort) {
            this.modelQuery = this.modelQuery.sort({
                pricePerHour: sortDirection,
            });
        }
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
}
exports.default = QueryBuilder;
