import HabitHeatmap from "./HabitHeatmap";

const HabitList = ({ habits, toggleHabitDate, deleteHabit }) => {
  return (
    <div className="flex flex-col gap-6">
      {habits.map((habit) => (
        <div 
          key={habit.id} 
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          {/* Header der Card - Padding separat */}
          <div className="p-6 pb-2 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{habit.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Aktivität
              </p>
            </div>
            <button 
              onClick={() => deleteHabit(habit.id)}
              className="p-2.5 text-black-400 hover:text-red-600 hover:bg-red-50 bg-red-50/30 rounded-xl transition-all shadow-sm border border-red-100"
              title="Habit löschen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Heatmap Bereich - Eigener Container für das Scrollen */}
          <div className="w-full px-4 pb-6 mt-2">
            <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
              {/* min-w-[500px] (oder ähnlich) stellt sicher, dass die Tabelle nicht gequetscht wird */}
              <div className="inline-block min-w-full align-middle pt-2">
                <HabitHeatmap 
                  history={habit.history} 
                  onCellClick={(date) => toggleHabitDate(habit.id, date)} 
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList;