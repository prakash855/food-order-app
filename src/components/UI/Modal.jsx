import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = ({ hideCartHandler }) => (
  <div onClick={hideCartHandler} className={classes.backdrop} />
);

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById(`overlays`);

const Modal = ({ children, hideCartHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop hideCartHandler={hideCartHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
