import React, { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { parseCsv } from "../utils/csvUtils";
import { setTableData } from "../features/dataGridSlice";

const ImportCsvModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Ref to hide the default input
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Please select a valid CSV file.");
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      setError("");
    }
  };

  const handleImport = useCallback(async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError("");

    try {
      const parsedData = await parseCsv(selectedFile);

      const dataWithIds = parsedData.map((row, index) => ({
        id: row.id || `${Date.now()}-${index}`,
        ...row,
      }));

      dispatch(setTableData(dataWithIds));

      onClose();
    } catch (err) {
      setError(err.message || "Failed to parse CSV. Check file format.");
    } finally {
      setLoading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input element
      }
    }
  }, [selectedFile, dispatch, onClose]);

  // Function to trigger the hidden file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import CSV Data">
      <p className="text-sm text-neutral-600 mb-4">
        Upload a **CSV file** to populate the table.
      </p>

      {/* 🎯 FIX: Custom file input display */}
      <div className="mb-4 flex items-center space-x-3">
        {/* Hidden actual file input */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden" // Hide the default input
        />

        {/* Custom Button Trigger */}
        <Button
          type="button"
          onClick={handleButtonClick}
          variant="primary"
          className="bg-primary-light text-primary hover:bg-primary-light/70"
        >
          Choose File
        </Button>

        {/* Display selected file name */}
        <span className="text-sm text-neutral-700">
          {selectedFile ? selectedFile.name : "No file chosen"}
        </span>
      </div>

      {error && (
        <p className="text-error text-sm mb-4 p-2 bg-red-50 border border-red-200 rounded">
          🚨 **Error:** {error}
        </p>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleImport}
          disabled={!selectedFile || loading}
        >
          {loading ? "Processing..." : "Import Data"}
        </Button>
      </div>
    </Modal>
  );
};

export default ImportCsvModal;
