import React, { useState } from "react";

const HabitForm = ({ addHabit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addHabit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Neues Ziel (z.B. Sport)"
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
        />
        
        <button
          type="submit"
          className="h-[50px] px-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {/* WICHTIG: h-5 w-5 begrenzt die Größe des Icons */}
          
          <span className="whitespace-nowrap">Hinzufügen</span>
        </button>
      </div>
    </form>
  );
};

export default HabitForm;