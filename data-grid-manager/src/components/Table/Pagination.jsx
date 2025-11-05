import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/dataGridSlice";
import Button from "../UI/Button";

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.dataGrid);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="flex justify-end items-center mt-4 space-x-2">
      <Button
        variant="tertiary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
      >
        Previous
      </Button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border rounded-lg text-sm font-medium transition duration-150 
            ${
              currentPage === page
                ? "bg-primary text-white shadow-md"
                : "text-neutral-700 bg-white hover:bg-neutral-100 border-neutral-300"
            }`}
        >
          {page}
        </button>
      ))}

      <Button
        variant="tertiary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
