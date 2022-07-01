import React from "react";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { paginationCount } from "../../../helper/filters";

const CustomPagination = ({ path, count, limit, page }) => {
  const router = useRouter();
  const pageCount = paginationCount(count, limit);
  //   page values
  const handleChange = (event, value) => {
    const currentPath = path;
    const currentQuery = router.query;
    currentQuery.page = value;
    currentQuery.limit = limit;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };
  return (
    <>
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          variant="outlined"
          color="primary"
          onChange={handleChange}
          page={page}
        />
      )}
    </>
  );
};

export default CustomPagination;
