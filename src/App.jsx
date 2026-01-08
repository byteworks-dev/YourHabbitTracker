import { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";

const App = () => {
  // Daten aus LocalStorage laden oder Standardwerte setzen
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habit-tracker-v1");
    return savedHabits ? JSON.parse(savedHabits) : [
      { id: 1, name: "Sport", history: {} },
      { id: 2, name: "Lesen", history: {} }
    ];
  });

  // Automatisches Speichern bei Änderungen
  useEffect(() => {
    localStorage.setItem("habit-tracker-v1", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = { id: Date.now(), name, history: {} };
    setHabits([...habits, newHabit]);
  };

  const toggleHabitDate = (habitId, date) => {
    setHabits(habits.map(h => 
      h.id === habitId ? { ...h, history: { ...h.history, [date]: !h.history[date] } } : h
    ));
  };

  const deleteHabit = (id) => {
    if (window.confirm("Diesen Habit wirklich löschen?")) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-20">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
            Habit Tracker
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Kleine Schritte führen zu großen Veränderungen.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-3xl mx-auto px-4 -mt-6">
        <div className="space-y-10">
          
          {/* EINGABE-KARTE */}
          <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
              Neues Ziel setzen
            </h2>
            <HabitForm addHabit={addHabit} />
          </section>

          {/* LISTE-SEKTION */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-bold text-slate-800">Deine Routine</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {habits.length} Aktive Habits
                </span>
              </div>
            </div>

            <HabitList 
              habits={habits} 
              toggleHabitDate={toggleHabitDate} 
              deleteHabit={deleteHabit} 
            />
          </section>

        </div>
      </main>
    </div>
  );
};

export default App;