import { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";

interface IModalProps {
  children: ReactNode;
}

const Modal = (props: IModalProps): React.ReactPortal => {
  const portalNode = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(portalNode);
    return () => portalNode.remove();
  }, [portalNode]);

  return ReactDOM.createPortal(props.children, portalNode);
};

export default Modal;
