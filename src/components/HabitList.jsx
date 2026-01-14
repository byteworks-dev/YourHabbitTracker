const HabitList = ({ habits, toggleHabitDate, deleteHabit }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {habits.map((habit) => {
        const isCompletedToday = habit.history?.includes(today);
        const streak = habit.history?.length || 0;

        return (
          <div 
            key={habit.id} 
            className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 transition-all group shadow-lg relative overflow-hidden"
          >
            {/* Dekorativer Hintergrund-Effekt bei Hover */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 rounded-full group-hover:bg-indigo-500/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${isCompletedToday ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                {isCompletedToday ? '✅' : '🎯'}
              </div>
              <button 
                onClick={() => deleteHabit(habit.id)}
                className="text-slate-600 hover:text-red-400 transition-colors text-[10px] font-black uppercase tracking-widest"
              >
                Löschen
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
              {habit.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-slate-500">Gesamte Tage:</span>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">
                {streak}
              </span>
            </div>

            <button
              onClick={() => toggleHabitDate(habit.id, today)}
              className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
                isCompletedToday 
                ? "bg-slate-800 text-green-400 border border-green-500/30" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
              }`}
            >
              {isCompletedToday ? "Für heute erledigt" : "Heute abschließen"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HabitList;