import { SDGGoal } from "@/types/action";
import { useEffect, useState } from "react";

export default function SDGGrid() {

  const [sdgData, setSdgData] = useState([
            //make an api call to get the array of 17 elements denoting points and set it to sdgData
            { id: 1, name: "No Poverty", points: 0, color: "#E5243B" },
            { id: 2, name: "Zero Hunger", points: 0, color: "#DDA63A" },
            { id: 3, name: "Good Health and Well-being", points: 0, color: "#4C9F38" },
            { id: 4, name: "Quality Education", points: 0, color: "#C5192D" },
            { id: 5, name: "Gender Equality", points: 0, color: "#FF3A21" },
            { id: 6, name: "Clean Water and Sanitation", points: 0, color: "#26BDE2" },
            { id: 7, name: "Affordable and Clean Energy", points: 0, color: "#FCC30B" },
            { id: 8, name: "Decent Work and Economic Growth", points: 0, color: "#A21942" },
            { id: 9, name: "Industry, Innovation and Infrastructure", points: 0, color: "#FD6925" },
            { id: 10, name: "Reduced Inequality", points: 0, color: "#DD1367" },
            { id: 11, name: "Sustainable Cities and Communities", points: 0, color: "#FD9D24" },
            { id: 12, name: "Responsible Consumption and Production", points: 0, color: "#BF8B2E" },
            { id: 13, name: "Climate Action", points: 0, color: "#3F7E44" },
            { id: 14, name: "Life Below Water", points: 0, color: "#0A97D9" },
            { id: 15, name: "Life on Land", points: 0, color: "#56C02B" },
            { id: 16, name: "Peace and Justice Strong Institutions", points: 0, color: "#00689D" },
            { id: 17, name: "Partnerships for the Goals", points: 0, color: "#19486A" },
        ]);

  useEffect(() => {
        const sdgData = [
      //make an api call to get the array of 17 elements denoting points and set it to sdgData
      { id: 1, name: "No Poverty", points: 0, color: "#E5243B" },
      { id: 2, name: "Zero Hunger", points: 0, color: "#DDA63A" },
      { id: 3, name: "Good Health and Well-being", points: 0, color: "#4C9F38" },
      { id: 4, name: "Quality Education", points: 0, color: "#C5192D" },
      { id: 5, name: "Gender Equality", points: 0, color: "#FF3A21" },
      { id: 6, name: "Clean Water and Sanitation", points: 0, color: "#26BDE2" },
      { id: 7, name: "Affordable and Clean Energy", points: 0, color: "#FCC30B" },
      { id: 8, name: "Decent Work and Economic Growth", points: 0, color: "#A21942" },
      { id: 9, name: "Industry, Innovation and Infrastructure", points: 0, color: "#FD6925" },
      { id: 10, name: "Reduced Inequality", points: 0, color: "#DD1367" },
      { id: 11, name: "Sustainable Cities and Communities", points: 0, color: "#FD9D24" },
      { id: 12, name: "Responsible Consumption and Production", points: 0, color: "#BF8B2E" },
      { id: 13, name: "Climate Action", points: 0, color: "#3F7E44" },
      { id: 14, name: "Life Below Water", points: 0, color: "#0A97D9" },
      { id: 15, name: "Life on Land", points: 0, color: "#56C02B" },
      { id: 16, name: "Peace and Justice Strong Institutions", points: 0, color: "#00689D" },
      { id: 17, name: "Partnerships for the Goals", points: 0, color: "#19486A" },
        ];
        (() => {
          fetch('/api/get-sdg-progress', {
            method: 'GET',
          }).then(res => res.json())
          .then(data => {
            // Process the fetched data as needed
            data.forEach((item: { sdgId: number; points: number }) => {
              sdgData[item.sdgId - 1].points = item.points;
            });
            setSdgData(sdgData);
          });
        })();
  }, []);
  

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold mb-4">My SDG Progress</h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
        {sdgData.map(goal => (
          <div key={goal.id} className="relative group">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold sdg-goal-card mx-auto"
              style={{ backgroundColor: goal.color }}
            >
              {goal.id}
            </div>

            <div className="tooltip absolute bottom-0 right mb-2 px-3 py-1 bg-slate-800 text-white text-xs rounded-md left-1/2 -translate-x-1/2 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100">
              {goal.name}: {goal.points} pts
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
