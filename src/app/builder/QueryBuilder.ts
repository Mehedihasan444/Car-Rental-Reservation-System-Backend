import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search(searchableFields: string[]) {
  //   const searchTerm = [this?.query?.searchTerm];
  //   console.log(searchTerm)
  //   if (searchTerm) {
  //     this.modelQuery = this.modelQuery.find({
  //       $or: searchableFields.map(
  //         (field) =>
  //           ({
  //             [field]: { $regex: searchTerm, $options: "i" },
  //           } as FilterQuery<T>)
  //       ),
  //     });
  //   }

  //   return this;
  // }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;

    
    if (searchTerm) {
      // Split the comma-separated string into an array of features
      const featureArray = typeof searchTerm === 'string' ? searchTerm.split(',').map(f => f.trim()) : [];
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
      if (featureArray && featureArray.length > 0) {
        this.modelQuery = this.modelQuery.find({
          features: { $in: featureArray }, // Matches cars with any of the selected features
        });
      }
    }
  
  
    return this;
  }
  
  

  filter() {
    const queryObj = { ...this.query };
    // Filtering
    const excludeFields = ["searchTerm", "sort", "limit", "page"];

    excludeFields.forEach((el) => delete queryObj[el]);
    if (queryObj.minPrice && queryObj.maxPrice) {
      this.modelQuery = this.modelQuery.find({
        pricePerHour: { $gte: queryObj.minPrice, $lte: queryObj.maxPrice },
      });
    } else {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }
  sort() {
    const sort = this?.query?.sort as string;
    const sortDirection = (this?.query?.sort as "asc" | "desc") || "asc";

    if (sort) {
      this.modelQuery = this.modelQuery.sort({
        pricePerHour: sortDirection,
      });
    }

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
