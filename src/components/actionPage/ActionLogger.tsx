import { useState } from "react";
import { useRouter } from 'next/navigation';
import { set } from "mongoose";

export default function ActionLogger() {
  const router = useRouter();
  const [actionDescription, setActionDescription] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold mb-2">Log a New Action</h3>

      <div className="space-y-4">
       
        <input
          id="action-description"
          type="text"
          placeholder="e.g., Used a reusable coffee cup"
          className="w-full p-3 border rounded-lg bg-slate-50"
          value={actionDescription}
          onChange={(e) => setActionDescription(e.target.value)}
        />

        <button
          onClick={async () => {
            if (!actionDescription) return;
            setLoading(true);
            try{
              await fetch('/api/actions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: actionDescription })
              });
              setActionDescription("");
            }catch(err){
              console.error("Failed to log action:", err);
            }finally{
              setLoading(false);
              router.refresh();
            }
          }}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg"
        >
          {loading ? (
            <>
              {/* Simple Tailwind Spinner */}
              <div className="flex justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging... 
                <div className="ml-1 font-light">Please wait this may take a while</div>
              </div>
            </>
          ) : (
            "Log Action & Earn Points"
          )}
        </button>
      </div>
    </section>
  );
}
