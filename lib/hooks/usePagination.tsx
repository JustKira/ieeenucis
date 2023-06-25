"use client";
import { useEffect, useState } from "react";

type PaginationProps = {
  per: number;
  countPromise?: number;
};

type PaginationResult = {
  currentPage: number;
  previousPage?: number;
  nextPage?: number;
  loading: boolean;
  handlePageClick: (page: number) => void;
};

export default function usePagination(
  per: number,
  countPromise: number | null
): PaginationResult {
  const [count, setCount] = useState(0);
  const totalPages = Math.ceil(count / per);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (countPromise) {
      setCount(countPromise);
      setLoading(false);
    }
  }, [countPromise]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const previousPage = currentPage > 1 ? currentPage - 1 : undefined;
  const nextPage = currentPage < totalPages ? currentPage + 1 : undefined;

  return {
    loading,
    handlePageClick,
    currentPage,
    previousPage,
    nextPage,
  };
}
