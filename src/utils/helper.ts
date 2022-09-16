const helper = {
  paginateAnArray(arr: object[], size: any, page: any): any {
    let skip = 0,
      limit = 0,
      data = null,
      totalRow = 0;

    size = parseInt(size);
    page = parseInt(page);

    // Limit item
    if (size && +size > 0) {
      // Limit page with size
      if (page && +page > 0) {
        skip = +page * +size;
        limit = +size;
      } else {
        // Limit page with default
        limit = +size;
      }
    } else {
      if (page && +page > 0) {
        return {
          currentPage: +page,
          totalPage: 1,
          data: [],
        };
      }
    }

    if (+size > 0) {
      totalRow = arr.length;
    }

    // Calculate total page
    const totalPage = +size > 0 ? Math.ceil(arr.length / +size) : 1;

    if (skip === 0 && limit === 0) {
      data = arr;
    } else {
      data = arr.slice(skip, skip + limit);
    }

    return {
      currentPage: +page ? +page : 0,
      totalRow,
      totalPage,
      data,
    };
  },
};

export default helper;
