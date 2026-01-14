import { useState } from "react";

const HabitForm = ({ addHabit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        // Placeholder-Farbe auf slate-400 gesetzt für bessere Sichtbarkeit
        placeholder="Neue Gewohnheit hinzufügen..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-[#0f172a] border border-slate-700 rounded-2xl px-6 py-4 text-white 
                   placeholder:text-slate-400 focus:outline-none focus:ring-2 
                   focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
      />
      <button 
        type="submit"
        className="bg-white text-[#0f172a] hover:bg-indigo-50 px-8 py-4 rounded-2xl 
                   font-black uppercase tracking-widest text-xs transition-all 
                   shadow-lg active:scale-95 shrink-0"
      >
        Hinzufügen
      </button>
    </form>
  );
};

export default HabitForm;