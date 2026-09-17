import { useSearchParams } from "react-router-dom";

interface Props {
  isLastPage: boolean;
}

export function Pagination({ isLastPage }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePrev = () => {
    if (currentPage > 1) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(currentPage - 1));
        return next;
      });
    }
  };

  const handleNext = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(currentPage + 1));
      return next;
    });
  };

  return (
    <nav className="d-flex justify-content-center my-5">
      <ul className="pagination shadow-sm border border-secondary-subtle rounded-3 overflow-hidden bg-white">
        <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
          <button
            className="page-link bg-white text-dark border-secondary-subtle fw-medium"
            onClick={handlePrev}
            disabled={currentPage <= 1}
          >
            <i className="bi bi-chevron-left me-1"></i> Anterior
          </button>
        </li>

        <li className="page-item disabled">
          <span className="page-link bg-light text-dark border-secondary-subtle fw-semibold">
            Página {currentPage}
          </span>
        </li>

        <li className="page-item">
          <button
            className="page-link bg-white text-dark border-secondary-subtle fw-medium"
            onClick={handleNext}
            disabled={isLastPage}
          >
            Siguiente <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
