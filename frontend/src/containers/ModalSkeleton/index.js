import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./ModalSkeleton.module.css";
import { mergeClass } from "../../helper/mergeClass";
import { AiOutlineClose } from "react-icons/ai";
function ModalSkeleton({
  show,
  setShow,
  heading,
  showClose,
  children,
  width,
  parentClass = "",
  headerClass = "",
  bodyClass = "",
}) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {" "}
      <style>{`
        .modal-dialog-centered {
          height: 100% !important;
        }
    
        .modal .modal-dialog {
          max-width: ${width};
          margin: 0px auto;
        }
        @media screen and (max-width: 992px) {
          .modal .modal-dialog {
            max-width: 70%;
          }
        }
        @media screen and (max-width: 768px) {
          .modal .modal-dialog {
            max-width: 80%;
          }
        }
        @media screen and (max-width: 575px) {
          .modal .modal-dialog {
            max-width: 90%;
          }
        }
      `}</style>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={mergeClass(classes.modal, parentClass)}
      >
        {heading && (
          <Modal.Header
            className={mergeClass(classes.modal_header, headerClass)}
          >
            <h1>{heading}</h1>
          </Modal.Header>
        )}
        {showClose && (
          <div className={classes.iconBox} onClick={handleClose}>
            <AiOutlineClose size={20} color={"#fff"} />
          </div>
        )}

        <Modal.Body className={mergeClass(classes.modal_body, bodyClass)}>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSkeleton;
