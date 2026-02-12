import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface GoalData {
  id: string;
  label: string;
  color: string;
  data: number[];
}

export default function ImpactChart() {
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [activeGoalId, setActiveGoalId] = useState("goal1");
  const [isLoading, setIsLoading] = useState(true);

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // 1. Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/get-chart-data');
        const data = await res.json();
        // Assuming API returns the full GoalData objects
        setGoals(data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeGoal = goals.find((g) => g.id === activeGoalId);

  // 2. Chart Lifecycle
  useEffect(() => {
    if (!chartRef.current || !activeGoal) return;

    // Destroy existing chart to prevent memory leaks and "canvas in use" errors
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: activeGoal.label,
          data: activeGoal.data,
          borderColor: activeGoal.color,
          backgroundColor: `${activeGoal.color}33`,
          borderWidth: 2,
          borderRadius: 6, // Rounded bars look more modern
          hoverBackgroundColor: activeGoal.color,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 750, easing: 'easeInOutQuart' }, // Smooth transitions
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            padding: 12,
            titleFont: { size: 14, weight: 'bold' },
            callbacks: {
              label: (context) => ` Points: ${context.parsed.y}`
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true,
            grid: { display: true, color: '#f1f5f9' },
            ticks: { stepSize: 10 } // Cleaner scale
          },
          x: { grid: { display: false } }
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [activeGoal, isLoading]); // Re-run when active goal changes or data finishes loading

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
      <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Impact Tracking</h3>
          <p className="text-sm text-slate-500">
            {isLoading ? "Fetching data..." : `Monitoring ${activeGoal?.label}`}
          </p>
        </div>

        <select
          disabled={isLoading}
          className="p-2 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50 transition-all cursor-pointer"
          value={activeGoalId}
          onChange={(e) => setActiveGoalId(e.target.value)}
        >
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              Goal {goal.id.replace("goal", "")}: {goal.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative h-72 w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        )}
        
        {!isLoading && goals.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <p>No impact data recorded yet.</p>
          </div>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
    </section>
  );
}