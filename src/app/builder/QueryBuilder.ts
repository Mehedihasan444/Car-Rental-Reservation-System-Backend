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
    
    // Only perform text search if searchTerm is provided and is a string
    if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim()) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
  
    return this;
  }
  
  

  filter() {
    const queryObj = { ...this.query };
    // Filtering
    const excludeFields = ["searchTerm", "sort", "limit", "page", "minPrice", "maxPrice"];

    excludeFields.forEach((el) => delete queryObj[el]);
    
    // Handle price range filtering
    if (this.query.minPrice || this.query.maxPrice) {
      const priceFilter: { $gte?: unknown; $lte?: unknown } = {};
      if (this.query.minPrice) priceFilter.$gte = this.query.minPrice;
      if (this.query.maxPrice) priceFilter.$lte = this.query.maxPrice;
      
      this.modelQuery = this.modelQuery.find({
        pricePerHour: priceFilter,
      });
    }
    
    // Handle remaining filters - ensure proper types
    const cleanedQuery: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(queryObj)) {
      // Skip if value is undefined or null or empty string
      if (value === undefined || value === null || value === '') continue;
      
      // Handle array values (like features)
      if (Array.isArray(value)) {
        // Filter out empty strings from array
        const filteredArray = value.filter(v => v !== '' && v !== null && v !== undefined);
        if (filteredArray.length > 0) {
          cleanedQuery[key] = { $in: filteredArray };
        }
      } 
      // Handle string values
      else if (typeof value === 'string') {
        cleanedQuery[key] = value;
      }
      // Handle number and boolean values
      else if (typeof value === 'number' || typeof value === 'boolean') {
        cleanedQuery[key] = value;
      }
    }
    
    // Only add remaining filters if there are any
    if (Object.keys(cleanedQuery).length > 0) {
      this.modelQuery = this.modelQuery.find(cleanedQuery as FilterQuery<T>);
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
