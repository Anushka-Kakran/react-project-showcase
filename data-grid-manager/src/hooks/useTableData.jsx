import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useTableData = () => {
  const { data, sortBy, sortOrder, globalSearchTerm, currentPage, rowsPerPage } = useSelector(
    (state) => state.dataGrid
  );

  const sortedAndFilteredData = useMemo(() => {
    let result = [...data];

    // 1. Global Search Logic (searches all fields) [cite: 11]
    if (globalSearchTerm) {
      const lowerCaseSearch = globalSearchTerm.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(lowerCaseSearch)
        )
      );
    }

    // 2. Sorting Logic (ASC/DESC toggle) [cite: 10]
    if (sortBy && sortOrder) {
      result.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue === undefined || bValue === undefined) return 0;

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, globalSearchTerm, sortBy, sortOrder]);

  // 3. Pagination Logic (10 rows per page) [cite: 12]
  const totalPages = Math.ceil(sortedAndFilteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = sortedAndFilteredData.slice(startIndex, endIndex);

  return { paginatedData, totalPages, sortedAndFilteredData };
};

export default useTableData;