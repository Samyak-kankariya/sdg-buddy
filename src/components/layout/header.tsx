"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'default';
  'data-testid'?: string;
}

const Button = ({ className, size, children, ...props }: ButtonProps) => {
  const sizeClasses = size === 'lg' ? 'text-lg px-8 py-3' : 'px-4 py-2';
  return (
    <button
      className={`rounded-md text-white font-semibold transition-colors ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState({
        name: "",
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
        if(data.profile){

          const user = {
            //obtain user object from profile api call
            name: data.profile.name,
            points: data.profile.totalPoints,
            streak: data.profile.currentStreak,
            achievements: data.profile.acheivements,
          };
          setUser(user);
        }
      });
    }, [])

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div onClick={() => {
            router.push('/');
        }} className="flex items-center space-x-3">
          <span className="text-2xl">🌱</span>
          <h1 className="text-xl font-bold text-emerald-600">SDG Buddy</h1>
        </div>
        {user.name == "" && <>
          <Button
            onClick={() => {
              router.push("/sign-in");
            }}
            // size="lg"+
            className="bg-emerald-600 hover:bg-emerald-700"
            data-testid="button-hero-login"
          >
            Sign In
          </Button>
        </>}
        {user.name != "" && <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-emerald-600">{user.name}</span>
          <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center font-bold text-emerald-700">
            {user.name.split(' ')[0][0]}
          </div>
        </div>}
      </nav>
    </header>
  );
}
