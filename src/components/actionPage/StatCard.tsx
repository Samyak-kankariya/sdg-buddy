interface Props {
    icon: string;
    label: string;
    value: string | number;
  }
  
  export default function StatCard({ icon, label, value }: Props) {
    return (
      <article className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
        <div className="bg-emerald-100 p-3 rounded-full">
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-slate-500 text-sm">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </article>
    );
  }
  