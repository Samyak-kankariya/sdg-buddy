import { LeaderboardUser } from "@/types/action";
import { useEffect, useState } from "react";

export default function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
      fetch('/api/get-leaderboard', {
        method: 'GET',
      }).then(res => res.json())
      .then(data => {
        setLeaderboard(data.leaderboard[0].leaderboard.map((user: any, index: number) => ({
          rank: index + 1,  
          name: user.name === undefined ? "You" : user.name,
          points: user.totalPoints,
        })));
      });
  }, []);

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold mb-4">Leaderboard</h3>

      <ul className="space-y-4">
        {leaderboard.map(user => (
          <li
            key={user.rank}
            className={`flex justify-between p-3 ${
              user.name === "You" ? "bg-emerald-50 rounded-lg" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-slate-500 font-bold w-6">{user.rank}</span>
              <span className={user.name === "You" ? "text-emerald-700 font-bold" : ""}>
                {user.name}
              </span>
            </div>
            <span
              className={
                user.name === "You" ? "text-emerald-700 font-bold" : "text-slate-600"
              }
            >
              {user.points} pts
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
