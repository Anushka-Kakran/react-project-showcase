import { createSlice } from "@reduxjs/toolkit";

// Dummy data for initial table view
const initialData = [
  {
    id: "1",
    name: "Alice Smith",
    email: "alice@example.com",
    age: 30,
    role: "Developer",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 24,
    role: "Manager",
    department: "Sales",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    age: 45,
    role: "Analyst",
    department: "Finance",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    age: 28,
    role: "Developer",
    department: "Engineering",
  },
  {
    id: "5",
    name: "Clark Kent",
    email: "clark@example.com",
    age: 50,
    role: "CEO",
    department: "Executive",
  },
  {
    id: "6",
    name: "Lois Lane",
    email: "lois@example.com",
    age: 35,
    role: "Journalist",
    department: "Media",
  },
  {
    id: "7",
    name: "Bruce Wayne",
    email: "bruce@example.com",
    age: 40,
    role: "Investor",
    department: "Finance",
  },
  {
    id: "8",
    name: "Selina Kyle",
    email: "selina@example.com",
    age: 32,
    role: "Security",
    department: "Operations",
  },
  {
    id: "9",
    name: "Barry Allen",
    email: "barry@example.com",
    age: 27,
    role: "Scientist",
    department: "R&D",
  },
  {
    id: "10",
    name: "Oliver Queen",
    email: "oliver@example.com",
    age: 38,
    role: "Philanthropist",
    department: "Executive",
  },
  {
    id: "11",
    name: "Hal Jordan",
    email: "hal@example.com",
    age: 31,
    role: "Pilot",
    department: "Operations",
  },
];

const defaultColumns = ["name", "email", "age", "role"];
const allColumns = [...defaultColumns, "department", "location"];

const persistedColumns =
  JSON.parse(localStorage.getItem("visibleColumns")) || defaultColumns;

const initialState = {
  data: initialData,
  allColumns: allColumns,
  visibleColumns: persistedColumns,
  sortBy: "",
  sortOrder: "",
  globalSearchTerm: "",
  currentPage: 1,
  rowsPerPage: 10,
  editedRows: {},
};

const dataGridSlice = createSlice({
  name: "dataGrid",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.data = action.payload;
      state.currentPage = 1;
      state.editedRows = {};
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.key;
      state.sortOrder = action.payload.order;
      state.currentPage = 1;
    },
    setSearchTerm: (state, action) => {
      state.globalSearchTerm = action.payload;
      state.currentPage = 1;
    },
    toggleColumnVisibility: (state, action) => {
      const column = action.payload;
      if (state.visibleColumns.includes(column)) {
        state.visibleColumns = state.visibleColumns.filter((c) => c !== column);
      } else {
        state.visibleColumns.push(column);
      }
      localStorage.setItem(
        "visibleColumns",
        JSON.stringify(state.visibleColumns)
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addNewColumn: (state, action) => {
      const newColumn = action.payload;
      if (!state.allColumns.includes(newColumn)) {
        state.allColumns.push(newColumn);
        state.visibleColumns.push(newColumn);
        localStorage.setItem(
          "visibleColumns",
          JSON.stringify(state.visibleColumns)
        );
      }
    },

    // 🎯 NEW REDUCER: Add a new row and prepare for immediate editing
    addNewRow: (state) => {
      const newId = `new-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const newRowData = { id: newId };
      state.allColumns.forEach((key) => {
        newRowData[key] = ""; // Initialize all columns as empty
      });

      // Add to the front of the data array
      state.data.unshift(newRowData);

      // Add to editedRows to display it as an editable row
      state.editedRows[newId] = newRowData;

      // Go to page 1
      state.currentPage = 1;
    },

    // Row Editing Actions (Global State)
    startEdit: (state, action) => {
      const rowId = action.payload;
      state.editedRows[rowId] = state.data.find((row) => row.id === rowId);
    },
    updateEditData: (state, action) => {
      const { id, key, value } = action.payload;
      if (state.editedRows[id]) {
        state.editedRows[id][key] = value;
      }
    },
    cancelEdit: (state, action) => {
      delete state.editedRows[action.payload];
    },

    // Global Save/Cancel Actions
    cancelAllEdits: (state) => {
      // Filter out any unsaved new rows (those with temporary IDs)
      state.data = state.data.filter(
        (row) => !row.id.startsWith("new-") || !state.editedRows[row.id]
      );
      state.editedRows = {};
    },
    saveAllEdits: (state) => {
      Object.keys(state.editedRows).forEach((rowId) => {
        const index = state.data.findIndex((row) => row.id === rowId);
        if (index !== -1) {
          state.data[index] = state.editedRows[rowId];
          // If it was a new row, replace its temporary ID with a permanent one
          if (state.data[index].id.startsWith("new-")) {
            state.data[index].id = `${Date.now()}-${index}`; // Assign a new "permanent" ID
          }
        }
      });
      state.editedRows = {};
    },

    // Delete Action
    deleteUserData: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((user) => user.id !== idToDelete);
      if (state.editedRows[idToDelete]) {
        delete state.editedRows[idToDelete];
      }
    },
  },
});

export const {
  setTableData,
  setSort,
  setSearchTerm,
  toggleColumnVisibility,
  setCurrentPage,
  addNewColumn,
  startEdit,
  updateEditData,
  cancelEdit,
  cancelAllEdits,
  saveAllEdits,
  deleteUserData,
  // 🎯 NEW EXPORT
  addNewRow,
} = dataGridSlice.actions;

export default dataGridSlice.reducer;
