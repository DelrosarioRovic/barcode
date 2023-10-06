import React from 'react';

const Thead = ({ headers }) => {
  return (
    <thead className="text-sm uppercase">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className="border text-sm border-black-500 py-2 border-collapse"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
