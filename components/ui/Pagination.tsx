"use client";
import usePagination from "@/lib/hooks/usePagination";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  per: number;
  count: number | null;
  paginationTrigger: (currentPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  per,
  count,
  paginationTrigger,
}) => {
  const { currentPage, nextPage, previousPage, loading, handlePageClick } =
    usePagination(per, count);
  useEffect(() => {
    if (!loading) {
      paginationTrigger(currentPage);
    }
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex gap-4">
        {/* <Button disabled className="w-8 h-8 rounded-full"></Button>{" "}
        <Button disabled className="w-8 h-8 rounded-full"></Button>{" "}
        <Button disabled className="w-8 h-8 rounded-full"></Button> */}
      </div>
    );
  }
  if (currentPage === 1 && !nextPage) {
    return <></>;
  }
  return (
    <div className="flex gap-4 h-full">
      {previousPage ? (
        <Button
          type="button"
          className="w-8 h-8 rounded-full font-medium "
          onClick={() => {
            handlePageClick(previousPage);
          }}
        >
          {previousPage}
        </Button>
      ) : (
        <></>
      )}
      <Button disabled className="w-8 h-8 rounded-full">
        {currentPage}
      </Button>
      {nextPage ? (
        <Button
          type="button"
          className="w-8 h-8 rounded-full"
          onClick={() => {
            handlePageClick(nextPage);
          }}
        >
          {nextPage}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pagination;
