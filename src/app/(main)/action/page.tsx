"use client";

import { useEffect, useState } from "react";
import StatCard from "@components/actionPage/StatCard";
import ActionLogger from "@components/actionPage/ActionLogger";
import ImpactChart from "@components/actionPage/ImpactChart";
import Leaderboard from "@components/actionPage/Leaderboard";
import SDGGrid from "@components/actionPage/SDGGrid";

export default function ActionPage() {
  // Global dashboard state  

  const [user, setUser] = useState({
    name: "User",
    points: 0,
    streak: 0,
    achievements: 0,
  });

  useEffect(() => {

      fetch('/api/get-dashboard-profile', {
        method: 'GET',
      }).then(res => res.json())
      .then(data => {
        // Process the fetched user profile data as needed
        // For example, you might want to set it in state
        const user = {
        //obtain user object from profile api call
          name: data.profile.name,
          points: data.profile.totalPoints,
          streak: data.profile.currentStreak,
          achievements: data.profile.acheivements,
        };
        setUser(user);
      });
      
  }, []);

  const state = {
    user: user,
  };

  return (
    <div className="p-6 bg-emerald-50 text-sm text-emerald-600">

      <main className="py-8">
        <h2 className="text-3xl font-bold mb-2">Welcome Back, {state.user.name}!</h2>
        <p className="text-slate-500 mb-8">Here's a summary of your positive impact.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard icon="⭐" label="Total Points" value={state.user.points} />
              <StatCard icon="🔥" label="Current Streak" value={`${state.user.streak} Days`} />
              <StatCard icon="🏆" label="Achievements" value={`${state.user.achievements} Badges`} />
            </section>

            <ActionLogger />
            <ImpactChart />

          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-8">
            <Leaderboard />
            <SDGGrid />
          </aside>

        </div>
      </main>
    </div>
  );
}
