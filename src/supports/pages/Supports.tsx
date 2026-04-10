import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../common/components/Modal/ConfirmModal';
import { FaPersonCirclePlus } from 'react-icons/fa6';
import { SupportTable } from '../components/SupportTable';
export const Supports = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-rows-[50px_1fr_auto] min-h-screen">
      <div className="h-full flex justify-end items-center">
        <button
          onClick={() => {
            navigate('/supports/create');
          }}
          className="flex justify-center items-center border border-violet-500 rounded h-2/3 p-2 hover:text-white hover:bg-violet-500 transition-colors">
          <FaPersonCirclePlus className="size-6 mx-2" />
          Add beneficiary
        </button>
      </div>
      <div>
        <SupportTable />
      </div>
      <ConfirmModal />
    </div>
  );
};
