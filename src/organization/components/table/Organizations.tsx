import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Organization } from '../../interfaces/Organization';
import { IoEyeOutline } from 'react-icons/io5';
import { GoPencil } from 'react-icons/go';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useOrganizationsPage } from '../../hooks/Organizations/useOrganizationsPage';
import { OrganizationInformation } from '../OrganizationInformation';
import { useModal } from '../../../common/contexts/ModalContext';

dayjs.extend(relativeTime);
dayjs.locale('vi');

type OrganizationProps = {
  organization: Organization;
};

export const Organizations = ({
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
  const { organizations, totalPage } = useOrganizationsPage(
    currentPage,
    searchKeyword,
  );
  useEffect(() => {
    setTotalPage(totalPage);
  }, [totalPage]);

  return (
    <div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {organizations.map((organization, index) => (
            <TableRow
              key={index}
              organization={organization}
            />
          ))}
        </tbody>
      </table>
      <OrganizationInformation />
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5"> Organization name </th>
        <th className="text-start p-1.5"> Management Level </th>
        <th className="text-start p-1.5"> Phone Number </th>
        <th className="text-start p-1.5"> Email </th>
        <th className="text-start p-1.5"> Last Updated </th>
        <th className="text-start p-1.5"> Tools </th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ organization }: OrganizationProps) => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <tr className="text-sm text-stone-500">
      <td className="p-1.5">{organization.organizationName}</td>
      <td className="p-1.5">{organization.managementLevel}</td>
      <td className="p-1.5">{organization.phoneNumber}</td>
      <td className="p-1.5">{organization.email}</td>

      <td className="p-1.5">{dayjs(organization.updateAt).fromNow()}</td>
      <td className=" p-1.5 ">
        <div className="flex justify-between items-center">
          <button
            onClick={() => openModal('OrganizationInformation', organization)}
            className="hover:text-white hover:bg-amber-500 transition-colors rounded cursor-pointer p-1">
            <IoEyeOutline className="size-5" />
          </button>
          <button
            onClick={() => {
              navigate(`/organizations/update/${organization.id}`);
            }}
            className="hover:text-white hover:bg-blue-500 transition-colors rounded cursor-pointer p-1">
            <GoPencil className="size-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};
