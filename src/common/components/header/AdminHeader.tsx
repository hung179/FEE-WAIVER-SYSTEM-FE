import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import { FiHome, FiLogOut } from 'react-icons/fi';

export default function Header() {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="flex w-full justify-between items-center bg-gray-900 text-white px-6 py-3 shadow-md">
      
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center font-bold">
          A
        </div>
        <div>
          <div className="text-sm text-gray-400">Admin Panel</div>
          <div className="font-semibold">{user?.fullName}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        
        <button
          onClick={() => navigate('/admin')}
          className="p-2 rounded-lg hover:bg-gray-700 transition"
        >
          <FiHome size={18} />
        </button>

        <button
          onClick={() =>
            openModal('CONFIRM', {
              title: 'Đăng xuất?',
              message: 'Bạn có chắc chắn muốn đăng xuất?',
              type: 'CONFIRM',
              onConfirm: logout,
            })
          }
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          <FiLogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}