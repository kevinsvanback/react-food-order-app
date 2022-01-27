import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Backdrop = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.onClick} />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>

  );
};

const portalHtmlElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalHtmlElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalHtmlElement)}
    </>
  );
};

export default Modal;