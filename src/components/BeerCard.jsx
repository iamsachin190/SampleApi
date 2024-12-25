import React from 'react';

const BeerCard = ({ beer }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-72">
      <img src={beer.image} alt={beer.name} className="h-40 w-full object-cover rounded-md" />
      <h3 className="text-xl font-semibold mt-4">{beer.name}</h3>
      <p className="text-gray-600 text-sm mt-2">{beer.description}</p>
    </div>
  );
};

export default BeerCard;
