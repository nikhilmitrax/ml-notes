import React from 'react';

const InteractiveCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 my-6 hover:shadow-md transition-shadow duration-300">
    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{title}</h3>
    {children}
  </div>
);

export default InteractiveCard;
