import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../features/dataGridSlice";

const ColumnTitle = {
  name: "Name",
  email: "Email",
  age: "Age",
  role: "Role",
  department: "Department",
  location: "Location",
};

const DataTableHeader = ({ columns }) => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder } = useSelector((state) => state.dataGrid);

  const handleSort = (key) => {
    let newOrder = "asc";
    if (sortBy === key) {
      if (sortOrder === "asc") newOrder = "desc";
      else if (sortOrder === "desc") newOrder = "";
      else newOrder = "asc";
    }
    dispatch(setSort({ key, order: newOrder }));
  };

  const getSortIcon = (key) => {
    if (sortBy !== key) return "↕️";
    if (sortOrder === "asc") return "⬆️";
    if (sortOrder === "desc") return "⬇️";
    return "↕️";
  };

  return (
    <thead className="bg-neutral-100 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
      <tr>
        {columns.map((columnKey) => (
          <th
            key={columnKey}
            onClick={() => handleSort(columnKey)}
            className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-200 uppercase tracking-wider cursor-pointer hover:bg-neutral-200/70 dark:hover:bg-neutral-600 transition duration-150"
          >
            <div className="flex items-center">
              {ColumnTitle[columnKey] ||
                columnKey.charAt(0).toUpperCase() +
                  columnKey.slice(1).replace(/([A-Z])/g, " $1")}
              <span className="ml-1 text-base">{getSortIcon(columnKey)}</span>
            </div>
          </th>
        ))}
        {/* Actions column */}
        <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-200 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default DataTableHeader;
