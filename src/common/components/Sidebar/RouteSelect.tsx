import React from 'react';
import type { IconType } from 'react-icons';
import { FiDollarSign, FiHome, FiUser } from 'react-icons/fi';
import { GoOrganization } from 'react-icons/go';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { useMatch, useNavigate } from 'react-router-dom';

export default function RouteSelect() {
  const navigate = useNavigate();

  return (
    <div className="space-y-1">
      <Route
        Icon={FiHome}
        active={!!useMatch("/admin/*")}
        title="Dashboard"
        onClick={() => navigate('/admin')}
      />
      <Route
        Icon={FiUser}
        active={!!useMatch("/users/*")}
        title="User"
        onClick={() => navigate('/users')}
      />
      <Route
        Icon={GoOrganization}
        active={!!useMatch("/organizations/*")}
        title="Organization"
        onClick={() => navigate('/organizations')}
      />
      <Route
        Icon={HiOutlineAcademicCap}
        active={!!useMatch("/academics/*")}
        title="Academic"
        onClick={() => navigate('/academics/year')}
      />
      <Route
        Icon={FiDollarSign}
        active={!!useMatch("/supports/*")}
        title="Support"
        onClick={() => navigate('/supports')}
      />
    </div>
  );
}

const Route = ({
  active,
  Icon,
  title,
  onClick,
}: {
  active: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow_background-color_color] 
      ${
        active
          ? 'bg-stone-100 text-stone-950 border-l-2 border-violet-500' 
          : 'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none'
      }
      `}>
      <Icon className={active ? 'text-violet-500' : ''}></Icon>
      <span>{title}</span>
    </button>
  );
};
