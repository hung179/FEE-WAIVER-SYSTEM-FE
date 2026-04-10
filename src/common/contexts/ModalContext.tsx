import { createContext, useContext, useState, type ReactNode } from 'react';

type ModalType = string;
type ModalItem = {
  name: ModalType;
  data?: any;
};

type ModalContextType = {
  modalStack: ModalItem[];
  openModal: (name: ModalType, data?: any) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);
  const openModal = (name: ModalType, data?: any) => {
    setModalStack((prev) => [...prev, { name, data }]);
  };

  const closeModal = () => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ modalStack, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }

  return context;
};
