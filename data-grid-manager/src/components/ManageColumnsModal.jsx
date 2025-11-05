import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleColumnVisibility,
  addNewColumn,
} from "../features/dataGridSlice";
import Modal from "./UI/Modal";
import Checkbox from "./UI/Checkbox";
import Input from "./UI/Input";
import Button from "./UI/Button";

const ManageColumnsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { allColumns, visibleColumns } = useSelector((state) => state.dataGrid);
  const [newColumnName, setNewColumnName] = useState("");

  const handleToggle = (column) => {
    dispatch(toggleColumnVisibility(column));
  };

  const handleAddColumn = () => {
    const key = newColumnName.toLowerCase().replace(/\s/g, "");

    if (!key) {
      alert("Please enter a valid column name.");
      return;
    }

    if (allColumns.includes(key)) {
      alert(`Column '${newColumnName}' already exists.`);
      return;
    }

    dispatch(addNewColumn(key));
    setNewColumnName("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Columns">
      {/* Column Visibility Toggles */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-neutral-800">
          Column Visibility
        </h3>

        <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 border rounded-lg bg-neutral-50">
          {allColumns.map((col) => (
            <Checkbox
              key={col}
              label={
                col.charAt(0).toUpperCase() +
                col.slice(1).replace(/([A-Z])/g, " $1")
              }
              checked={visibleColumns.includes(col)}
              onChange={() => handleToggle(col)}
            />
          ))}
        </div>
      </div>

      {/* Add New Column Field */}
      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold mb-3 text-neutral-800">
          Add New Field/Column
        </h3>
        <div className="flex space-x-2">
          <Input
            placeholder="e.g., Location"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            className="flex-grow"
          />
          <Button variant="primary" onClick={handleAddColumn}>
            Add Field
          </Button>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="secondary" onClick={onClose}>
          Done
        </Button>
      </div>
    </Modal>
  );
};

export default ManageColumnsModal;
