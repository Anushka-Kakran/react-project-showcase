import { useSelector, useDispatch } from "react-redux";
import {
  startEdit,
  updateEditData,
  cancelEdit,
  deleteUserData,
} from "../../features/dataGridSlice";
import Button from "../UI/Button";

const DataTableRow = ({ user, columns }) => {
  const dispatch = useDispatch();
  const editedData = useSelector((state) => state.dataGrid.editedRows[user.id]);
  const isEditing = !!editedData;

  const handleEdit = () => {
    dispatch(startEdit(user.id));
  };

  const handleInputChange = (e, key) => {
    // Dispatch action to update the data for this row ID and key in the Redux editedRows map
    dispatch(updateEditData({ id: user.id, key: key, value: e.target.value }));
  };

  const handleCancel = () => {
    // Cancel editing for this specific row
    dispatch(cancelEdit(user.id));
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.name}? This action cannot be undone.`
      )
    ) {
      dispatch(deleteUserData(user.id));
    }
  };

  // Determine the value to display (edited data if editing, otherwise original user data)
  const displayData = editedData || user;

  return (
    <tr
      key={user.id}
      className={`
        hover:bg-primary-light/50 dark:hover:bg-neutral-700 transition duration-150 
        ${
          isEditing
            ? "bg-editing dark:bg-editing-dark"
            : "bg-white dark:bg-neutral-800"
        }
      `}
      onDoubleClick={handleEdit}
    >
      {/* Dynamic Columns */}
      {columns.map((columnKey) => (
        <td
          key={columnKey}
          className="px-6 py-3 text-sm text-neutral-700 dark:text-neutral-300"
        >
          {isEditing ? (
            <input
              type={columnKey === "age" ? "number" : "text"}
              value={displayData[columnKey]}
              onChange={(e) => handleInputChange(e, columnKey)}
              // Styling for input fields
              className="border rounded px-2 py-1 w-full text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
              min={columnKey === "age" ? "1" : undefined}
            />
          ) : (
            displayData[columnKey]
          )}
        </td>
      ))}

      {/* Row Actions */}
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
        {isEditing ? (
          // Only show Cancel button here, as Save All is handled globally in the header
          <div className="space-x-1 flex">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-x-1 flex">
            <Button variant="tertiary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default DataTableRow;
