import Papa from "papaparse";
import { saveAs } from "file-saver"; // File Export (The package name is 'file-saver')

/**
 * Exports data to a CSV file, including only the specified visible columns.
 * @param {Array<Object>} data The array of objects (rows) to export.
 * @param {Array<string>} visibleColumns The keys (columns) to include in the output.
 */
export const exportToCsv = (data, visibleColumns) => {
  // Map data to only include visible columns
  const exportData = data.map((row) =>
    visibleColumns.reduce((obj, key) => {
      // Ensure only keys that exist in the row are added
      if (row.hasOwnProperty(key)) {
        obj[key] = row[key];
      }
      return obj;
    }, {})
  );

  // Convert the JSON array to a CSV string
  const csv = Papa.unparse(exportData);

  // Create a Blob and save the file
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "dynamic_data_export.csv"); // Export current table view
};

/**
 * Parses a CSV file and converts it to a clean array of objects.
 * @param {File} file The CSV file to parse.
 * @returns {Promise<Array<Object>>} A promise that resolves with the parsed data.
 */
export const parseCsv = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true,
      dynamicTyping: true, // Attempt to convert numbers/booleans
      complete: (results) => {
        // Basic error checking for invalid format
        if (results.errors.length) {
          console.error("CSV Parsing Errors:", results.errors);
          // Simple validation: check if data rows exist
          if (!results.data || results.data.length === 0) {
            reject(
              new Error(
                "Invalid format: CSV file is empty or headers are missing."
              )
            );
            return;
          }
        }
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
