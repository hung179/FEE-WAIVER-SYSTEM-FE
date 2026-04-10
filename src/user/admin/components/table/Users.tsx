import React, { useEffect, useState } from 'react';
import type { User } from '../../../../common/interfaces/User';
import { IoEyeOutline } from 'react-icons/io5';
import { GoPencil } from 'react-icons/go';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ToggleAccountStatus } from '../ToggleAccountStatus';
import { useNavigate } from 'react-router-dom';
import { UserInformation } from '../modals/UserInformation';
import { useUsers } from '../../hooks/useUsers';

dayjs.extend(relativeTime);
dayjs.locale('vi');

type UserProps = {
  user: User;
};

export const Users = ({
  currentPage,
  setCurrentPage,
  setTotalPage,
  searchKeyword,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  searchKeyword: string;
}) => {
  const { users, totalPage, currentPageFromServer, loading, error } = useUsers({
    currentPage,
    searchKeyword,
  });
  useEffect(() => {
    setCurrentPage(currentPageFromServer);
    setTotalPage(totalPage);
  }, [currentPageFromServer, totalPage]);
  return (
    <div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5"> Username </th>
        <th className="text-start p-1.5"> Full name </th>
        <th className="text-start p-1.5"> Date of birth </th>
        <th className="text-start p-1.5"> Last Updated </th>
        <th className="text-start p-1.5"> Account Status </th>
        <th className="text-start p-1.5"> Role </th>
        <th className="text-start p-1.5"> Tools </th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ user }: UserProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <tr className="text-sm text-stone-500">
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1">
          {user.username}
        </a>
      </td>
      <td className="p-1.5">{user.fullName}</td>
      <td className="p-1.5">{user.dateOfBirth.toString()}</td>
      <td className="p-1.5">{dayjs(user.updateAt).fromNow()}</td>
      <td>
        <ToggleAccountStatus
          id={user.id}
          accountStatus={user.accountStatus}
        />
      </td>
      <td className="p-1.5">{user.role}</td>
      <td className=" p-1.5 ">
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="hover:text-white hover:bg-amber-500 transition-colors rounded cursor-pointer p-1">
            <IoEyeOutline className="size-5" />
          </button>
          <button
            onClick={() => {
              navigate(`/users/update/${user.id}`);
            }}
            className="hover:text-white hover:bg-blue-500 transition-colors rounded cursor-pointer p-1">
            <GoPencil className="size-5" />
          </button>
          <UserInformation
            user={user}
            isOpen={isOpen}
            onClose={onClose}
          />
        </div>
      </td>
    </tr>
  );
};
