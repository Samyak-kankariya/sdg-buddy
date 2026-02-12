import React from "react";

const sustainableDevelopmentGoals = [
  { goal: "No Poverty", description: "End poverty in all its forms everywhere." },
  { goal: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture." },
  { goal: "Good Health and Well-being", description: "Ensure healthy lives and promote well-being for all at all ages." },
  { goal: "Quality Education", description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all." },
  { goal: "Gender Equality", description: "Achieve gender equality and empower all women and girls." },
  { goal: "Clean Water and Sanitation", description: "Ensure availability and sustainable management of water and sanitation for all." },
  { goal: "Affordable and Clean Energy", description: "Ensure access to affordable, reliable, sustainable and modern energy for all." },
  { goal: "Decent Work and Economic Growth", description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all." },
  { goal: "Industry, Innovation and Infrastructure", description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation." },
  { goal: "Reduced Inequality", description: "Reduce inequality within and among countries." },
  { goal: "Sustainable Cities and Communities", description: "Make cities and human settlements inclusive, safe, resilient and sustainable." },
  { goal: "Responsible Consumption and Production", description: "Ensure sustainable consumption and production patterns." },
  { goal: "Climate Action", description: "Take urgent action to combat climate change and its impacts." },
  { goal: "Life Below Water", description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development." },
  { goal: "Life on Land", description: "Protect, restore and promote sustainable use of terrestrial ecosystems, manage forests sustainably, combat desertification, and halt biodiversity loss." },
  { goal: "Peace, Justice and Strong Institutions", description: "Promote peaceful and inclusive societies, provide access to justice for all, and build effective, accountable institutions." },
  { goal: "Partnerships for the Goals", description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development." }
];

const SdgShowcase = () => (
  <div className="bg-white rounded-lg p-8 border border-gray-200 mb-16 md:mb-24">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Aligned with the UN Sustainable Development Goals
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Every action you take is mapped to specific SDG targets, showing how individual choices 
        contribute to global sustainability efforts.
      </p>
    </div>
    
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4 justify-center">
      {[
        { id: 1, title: 'No Poverty', color: '#E5243B' },
        { id: 2, title: 'Zero Hunger', color: '#DDA63A' },
        { id: 3, title: 'Good Health', color: '#4C9F38' },
        { id: 6, title: 'Clean Water', color: '#26BDE2' },
        { id: 7, title: 'Clean Energy', color: '#FCC30B' },
        { id: 11, title: 'Sustainable Cities', color: '#FD9D24' },
        { id: 12, title: 'Responsible Consumption', color: '#BF8B2E' },
        { id: 13, title: 'Climate Action', color: '#3F7E44' },
        { id: 14, title: 'Life Below Water', color: '#0A97D9' },
        { id: 15, title: 'Life On Land', color: '#56C02B' },
        { id: 17, title: 'Partnerships', color: '#19486A' },
      ].map((sdg) => (
        <div key={sdg.id} onClick={() => {
          alert(sustainableDevelopmentGoals[sdg.id-1].description)
        }} className="text-center group" title={sdg.title}>
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform"
            style={{ backgroundColor: sdg.color }}
          >
            {sdg.id}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SdgShowcase;