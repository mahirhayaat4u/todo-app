import React from 'react';

const BoxPattern = () => {
  // Number of columns and rows
  const columns = 10;
  const rows = 10;

  // Generate the grid items
  const gridItems = [];
  for (let i = 0; i < columns * rows; i++) {
    gridItems.push(
      <div key={i} className="h-16 w-16 bg-white border border-gray-300"></div>
    );
  }

  return (
    <div className=" absolute -z-50 min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="grid grid-cols-10 gap-2">
        {gridItems}
      </div>
    </div>
  );
};

export default BoxPattern;
