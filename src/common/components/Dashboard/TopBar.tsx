
import { useAuth } from '../../contexts/AuthContext';

export const TopBar = () => {

  const {user} = useAuth();

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(today);

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            {' '}
            Good day, {user?.fullName} !{' '}
          </span>
          <span className="text-xs block text-stone-500">
            {formattedDate}
          </span>
        </div>

      </div>
    </div>
  );
};
