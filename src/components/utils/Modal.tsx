import { ReactNode } from "react"

type ModalProps = {
    children: ReactNode;
  };
  
  export const Modal = ({ children }: ModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {children}
      </div>
    );
  };