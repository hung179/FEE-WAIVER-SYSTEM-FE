import { useUsers } from '../../hooks/useUser';

export const AdminActivityLog = () => {
  const { users } = useUsers();

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              username={user.username}
              accountStatus={user.accountStatus}
              date={user.dateOfBirth}
              fullName={user.fullName}
              role={user.role}
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
        <th className="text-start p-1.5"> Date </th>
        <th className="text-start p-1.5"> Account Status </th>
        <th className="text-start p-1.5"> Role </th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  username,
  fullName,
  date,
  accountStatus,
  role,
}: {
  username: string;
  fullName: string;
  date: Date;
  accountStatus: string;
  role: string;
}) => {
  return (
    <tr className="text-sm text-stone-500">
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1">
          {username}
        </a>
      </td>
      <td className="p-1.5">{fullName}</td>
      <td className="p-1.5">{date.toString()}</td>
      <td
        className={`p-1.5 my-2 ${
          accountStatus === 'ACTIVE'
            ? 'inline-block bg-green-200 text-green-500 rounded'
            : 'rounded inline-block bg-red-200 text-red-500'
        }`}>
        {accountStatus}
      </td>
      <td className="p-1.5">{role}</td>
    </tr>
  );
};
