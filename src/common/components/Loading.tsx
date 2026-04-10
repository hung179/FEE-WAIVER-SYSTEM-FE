import React from 'react';

export const Loading = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="h-24 bg-gray-300 rounded"></div>
        <div className="h-24 bg-gray-300 rounded"></div>
        <div className="h-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};
