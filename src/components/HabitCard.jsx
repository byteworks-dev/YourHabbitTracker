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
        placeholder="Neue Gewohnheit, z.B. Laufen gehen..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-[#0f172a] border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
      />
      <button 
        type="submit"
        className="bg-white text-[#0f172a] hover:bg-indigo-50 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95"
      >
        Hinzufügen
      </button>
    </form>
  );
};

export default HabitForm;