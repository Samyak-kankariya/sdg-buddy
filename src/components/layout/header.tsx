"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
}

const ButtonLink = ({ href, className, children, ...props }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`inline-block rounded-md text-white font-semibold transition-colors px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [user, setUser] = useState({ name: "", points: 0, streak: 0, achievements: 0 });
  const [isLoading, setIsLoading] = useState(true); 
    
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/get-dashboard-profile')
      .then(res => res.json())
      .then(data => {
        if(data.profile){
          setUser({
            name: data.profile.name,
            points: data.profile.totalPoints,
            streak: data.profile.currentStreak,
            achievements: data.profile.acheivements,
          });
        }
      })
      .catch(err => console.error("Failed to fetch user:", err)) 
      .finally(() => setIsLoading(false)); 
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🌱</span>
          <h1 className="text-xl font-bold text-emerald-600">SDG Buddy</h1>
        </Link>
        
        {!isLoading && (
          <>
            {user.name === "" ? (
              <ButtonLink
                href="/sign-in"
                className="bg-emerald-600 hover:bg-emerald-700"
                data-testid="link-header-login"
              >
                Sign In
              </ButtonLink>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-emerald-600">{user.name}</span>
                <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center font-bold text-emerald-700">
                  {user.name.split(' ')[0][0].toUpperCase()}
                </div>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
}