# Dynamic Data Grid Manager

## 🌟 Overview
This is a comprehensive implementation of a **dynamic, feature-rich Data Grid** application, solving common enterprise needs for highly interactive data tables. It demonstrates advanced concepts in **Redux Toolkit** for state handling and a modern design using **Tailwind CSS**.

### ✨ Key Features

* **Global Inline Editing** with **Save All/Cancel All**: Uses Redux to track local edits (`editedRows` state) separately from the main data, allowing multiple-row batch operations.
* **Dynamic Column Management**: Users can show, hide, and add new fields (persisted via `localStorage`).
* **Theme Toggle**: Implements persistent **Dark Mode** using Tailwind CSS's `darkMode: 'class'`.
* **Search, Sort, & Paginate**: Integrated global search, multi-state sorting, and 10-item pagination.
* **CSV Handling**: Imports data from CSV and exports only the currently visible columns.
* **Row CRUD**: Functionality to **Add New Row** and **Delete Row**.

## 🛠️ Tech Stack
* **Framework:** React (Functional Components, Hooks)
* **State Management:** Redux Toolkit (RTK)
* **Styling:** Tailwind CSS

## 🚀 Installation & Run

1.  Navigate to the project folder: `cd data-grid-manager`
2.  Install dependencies: `npm install`
3.  Run the server: `npm run dev`