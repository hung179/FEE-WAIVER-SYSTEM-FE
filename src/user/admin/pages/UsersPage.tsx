import { AiOutlineUserAdd } from 'react-icons/ai';
import { Users } from '../components/table/Users';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Pagination } from '../../../common/components/Pagination';

export const UsersPage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className="grid grid-rows-[50px_1fr_auto] min-h-screen">
      <div className="h-full flex justify-between items-center">
        <input
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          className="shadow h-2/3 rounded w-2/3 text-stone-500 focus:outline-none bg-stone-200 p-2"
          type="text"
          placeholder="Enter username"
        />
        <button
          onClick={() => {
            navigate('/users/create');
          }}
          className="flex justify-center items-center border border-violet-500 rounded h-2/3 p-2 hover:text-white hover:bg-violet-500 transition-colors">
          <AiOutlineUserAdd />
          Add User
        </button>
      </div>
      <div>
        <Users
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPage={setTotalPage}
          searchKeyword={searchKeyword}
        />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
