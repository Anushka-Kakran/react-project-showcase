import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  saveAllEdits,
  cancelAllEdits,
  addNewRow,
} from "../../features/dataGridSlice";
import useTableData from "../../hooks/useTableData";
import DataTableHeader from "./DataTableHeader";
import DataTableRow from "./DataTableRow";
import Pagination from "./Pagination";
import { exportToCsv } from "../../utils/csvUtils";
import Button from "../UI/Button";

const DataTable = ({ onOpenManageColumns, onOpenImportCsv }) => {
  const dispatch = useDispatch();
  const { visibleColumns, globalSearchTerm, editedRows } = useSelector(
    (state) => state.dataGrid
  );
  const { paginatedData, totalPages, sortedAndFilteredData } = useTableData();

  const hasPendingEdits = Object.keys(editedRows).length > 0;

  const handleExport = () => {
    exportToCsv(sortedAndFilteredData, visibleColumns);
  };

  // 🎯 NEW HANDLER
  const handleAddNewRow = () => {
    dispatch(addNewRow());
  };

  const handleSaveAll = () => {
    // VALIDATION BEFORE SAVE ALL (Simple check for age)
    let hasError = false;
    Object.keys(editedRows).forEach((rowId) => {
      const row = editedRows[rowId];
      // Check if visible and check if value is not a valid number
      if (
        visibleColumns.includes("age") &&
        (isNaN(Number(row.age)) || Number(row.age) <= 0)
      ) {
        hasError = true;
      }
    });

    if (hasError) {
      alert(
        "Validation Error: Cannot save all. Please ensure all 'Age' fields contain positive numbers."
      );
      return;
    }

    dispatch(saveAllEdits());
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-800 shadow-xl rounded-lg">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        {/* Global Search with Integrated Icon */}
        <div className="relative w-full sm:w-1/3 min-w-[200px]">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            type="text"
            placeholder="Global Search..."
            value={globalSearchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="p-2 pl-10 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary w-full dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
          />
        </div>

        <div className="flex space-x-2">
          {/* Save All / Cancel All Buttons */}
          {hasPendingEdits && (
            <>
              <Button
                variant="secondary"
                onClick={() => dispatch(cancelAllEdits())}
              >
                Cancel All
              </Button>
              <Button variant="primary" onClick={handleSaveAll}>
                Save All ({Object.keys(editedRows).length})
              </Button>
            </>
          )}

          {/* 🎯 NEW BUTTON: Add New Row */}
          <Button
            variant="primary"
            onClick={handleAddNewRow}
            disabled={hasPendingEdits}
          >
            + Add Row
          </Button>

          <Button variant="tertiary" onClick={onOpenImportCsv}>
            Import CSV
          </Button>
          <Button variant="primary" onClick={handleExport}>
            Export CSV
          </Button>
          <Button variant="tertiary" onClick={onOpenManageColumns}>
            Manage Columns
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <DataTableHeader columns={visibleColumns} />

          <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-700">
            {paginatedData.map((user) => (
              <DataTableRow
                key={user.id}
                user={user}
                columns={visibleColumns}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default DataTable;
