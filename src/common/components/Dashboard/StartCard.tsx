import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { useCountUser } from '../../hooks/useCountUser';
import { useCountBeneficiary } from '../../hooks/useCountBeneficiary';
import { useCountStudentInformation } from '../../hooks/useCountStudentInformation';
import { useMemo } from 'react';

export const StartCard = () => {
  const isoString = useMemo(() => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    return startDate.toISOString();
  }, []);

  const period = useMemo(() => {
    const start = new Date(isoString);
    const end = new Date();

    const format = (date: Date) =>
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

    return `From ${format(start)} - ${format(end)}`;
  }, [isoString]);

  const { data: countUser = { count: 0, percent: 0 } } =
    useCountUser(isoString);
  const { data: countBeneficiary = { count: 0, percent: 0 } } =
    useCountBeneficiary(isoString);
  const { data: countStudentInformation = { count: 0, percent: 0 } } =
    useCountStudentInformation(isoString);

  return (
    <>
      <Card
        title="New Users"
        count={countUser.count}
        percent={countUser.percent}
        period={period}
      />

      <Card
        title="New Beneficiary"
        count={countBeneficiary.count}
        percent={countBeneficiary.percent}
        period={period}
      />

      <Card
        title="New Student Information"
        count={countStudentInformation.count}
        percent={countStudentInformation.percent}
        period={period}
      />
    </>
  );
};

const Card = ({
  title,
  count,
  percent,
  period,
}: {
  title: string;
  count: string;
  percent: number;
  period: string;
}) => {
  const trend = percent >= 0 ? 'up' : 'down';
  const pillText = `${Math.abs(percent).toFixed(2)}%`;
  return (
    <div className="p-4 rounded border border-stone-300 col-span-4">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold"> {count} </p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
          {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
