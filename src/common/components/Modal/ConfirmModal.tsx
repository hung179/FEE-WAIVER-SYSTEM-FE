import { createPortal } from 'react-dom';
import {
  FaExclamationTriangle,
  FaQuestionCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import { TiTick } from 'react-icons/ti';
import { useModal } from '../../contexts/ModalContext';

export const ConfirmModal = () => {
  const { modalStack, closeModal } = useModal();

  const currentModal = modalStack[modalStack.length - 1];

  if (!currentModal || currentModal.name !== 'CONFIRM') return null;

  const modalData = currentModal.data;
  const handleConfirm = () => {
    if (modalData.onConfirm) modalData.onConfirm();

    closeModal();
  };

  const handleCancel = () => {
    if (modalData.onCancel) modalData.onCancel();

    closeModal();
  };

  return createPortal(
    <div className="fixed inset-0 duration-500 transform transition-transform bg-stone-300/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-4 rounded grid w-[90%] max-w-md">
        <div className=" text-2xl font-bold my-2 text-center">
          {modalData.title}
        </div>
        <div className=" my-2 text-center">
          {modalData.type === 'DELETE' && (
            <div className="rounded-full bg-red-500 p-2 inline-block">
              <GoTrash className="text-3xl text-white" />
            </div>
          )}
          {modalData.type === 'CONFIRM' && (
            <div className="rounded-full bg-blue-500 p-2 inline-block">
              <FaQuestionCircle className="text-3xl text-white" />
            </div>
          )}
          {modalData.type === 'SUCCESS' && (
            <div className="rounded-full bg-green-500 p-2 inline-block">
              <TiTick className="text-3xl text-white" />
            </div>
          )}
          {modalData.type === 'WARN' && (
            <div className="rounded-full p-2 inline-block">
              <FaExclamationTriangle className="text-3xl text-yellow-500" />
            </div>
          )}
          {modalData.type === 'ERROR' && (
            <div className="rounded-full bg-red-500 p-2 inline-block">
              <FaTimesCircle className="text-3xl text-white" />
            </div>
          )}
        </div>
        <div className="my-2 text-center text-base">{modalData.message}</div>
        <div
          className={`flex items-center p-4 ${
            modalData.type === 'DELETE' || modalData.type === 'CONFIRM'
              ? `justify-between gap-2`
              : `justify-center`
          }`}>
          {modalData.type === 'DELETE' && (
            <>
              <button
                onClick={handleConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded w-24">
                Xóa
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded w-24">
                Hủy
              </button>
            </>
          )}

          {modalData.type === 'CONFIRM' && (
            <>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white p-2 rounded w-32">
                Xác nhận
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded w-24">
                Hủy
              </button>
            </>
          )}

          {modalData.type === 'SUCCESS' && (
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-white p-2 rounded w-32">
              OK
            </button>
          )}

          {modalData.type === 'WARN' && (
            <button
              disabled={modalData.type !== 'WARN'}
              onClick={handleConfirm}
              className="bg-yellow-500 text-white p-2 rounded w-32">
              Xác nhận
            </button>
          )}
          {modalData.type === 'ERROR' && (
            <button
              onClick={handleConfirm}
              className="bg-red-500 text-white p-2 rounded w-32">
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
