"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActionLogger() {
  const router = useRouter();
  const [actionDescription, setActionDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Added error state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    
    const trimmedDescription = actionDescription.trim();
    if (!trimmedDescription) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: trimmedDescription })
      });

      if (!response.ok) {
        throw new Error("Failed to log action");
      }

      setActionDescription("");
      router.refresh();
    } catch (err) {
      console.error("Failed to log action:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-emerald-600">Log a New Action</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="action-description" className="sr-only">
            Action Description
          </label>
          <input
            id="action-description"
            type="text"
            placeholder="e.g., Used a reusable coffee cup"
            className="w-full p-3 border border-gray-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-emerald-600"
            value={actionDescription}
            onChange={(e) => setActionDescription(e.target.value)}
            disabled={loading} // Disable input while loading
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !actionDescription.trim()} // Prevent empty or double submissions
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              {/* Simple Tailwind Spinner */}
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Logging... <span className="font-light text-sm ml-1">Please wait</span></span>
            </>
          ) : (
            "Log Action & Earn Points"
          )}
        </button>
      </form>
    </section>
  );
}