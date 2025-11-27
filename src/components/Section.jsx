import React from 'react';

const Section = ({ title, children, icon: Icon }) => (
  <section className="mb-16 border-l-2 border-slate-200 pl-6 relative">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white" />
    <div className="flex items-center gap-3 mb-6">
      {Icon && <Icon className="w-6 h-6 text-blue-600" />}
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
    {children}
  </section>
);

export default Section;
