import React, { useState, useEffect } from "react";
import DataTable from "./components/Table/DataTable";
import ManageColumnsModal from "./components/ManageColumnsModal";
import ImportCsvModal from "./components/ImportCsvModal";

// Function to handle initial theme setting
const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "light";
};

function App() {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-8">
      <header className="mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-center">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-neutral-800 dark:text-neutral-100">
            Dynamic Data Table Manager
          </h1>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-1">
          A Full-Stack Data Grid Implementation (React, Redux, Tailwind CSS)
        </p>
      </header>

      <DataTable
        onOpenManageColumns={() => setIsManageModalOpen(true)}
        onOpenImportCsv={() => setIsImportModalOpen(true)}
      />

      <ManageColumnsModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />

      <ImportCsvModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}

export default App;
