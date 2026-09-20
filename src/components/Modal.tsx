import { useEffect, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  scrollable?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  scrollable = false,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{ zIndex: 1040 }}
      />

      <div
        className="modal d-block fade show"
        tabIndex={-1}
        style={{ zIndex: 1050 }}
        onClick={onClose}
      >
        <div
          className={`modal-dialog modal-dialog-centered modal-lg${
            scrollable ? " modal-dialog-scrollable" : ""
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="custom-modal-anim modal-content border-0 shadow-lg">
            <div className="modal-header border-bottom px-4 py-3">
              <h5 className="modal-title text-dark fw-bold">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Cerrar modal"
              />
            </div>

            <div className="modal-body bg-light-subtle p-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
