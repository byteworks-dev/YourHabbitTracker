import { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";

const App = () => {
  // 1. Initialisierung des States aus dem LocalStorage
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habit-tracker-data");
    if (savedHabits) {
      return JSON.parse(savedHabits);
    }
    // Standard-Werte, falls noch nichts gespeichert ist
    return [
      { id: 1, name: "Sport", history: {} },
      { id: 2, name: "Lesen", history: {} },
    ];
  });

  // 2. useEffect: Speichert die Daten automatisch bei jeder Änderung
  useEffect(() => {
    localStorage.setItem("habit-tracker-data", JSON.stringify(habits));
  }, [habits]);

  // 3. Funktion: Neuen Habit hinzufügen
  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name: name,
      history: {}, 
    };
    setHabits([...habits, newHabit]);
  };

  // 4. Funktion: Status eines Tages umschalten (Toggle)
  const toggleHabitDate = (habitId, date) => {
  setHabits((prevHabits) =>
    prevHabits.map((habit) => {
      if (habit.id === habitId) {
        // WICHTIG: Wir erstellen eine tiefe Kopie der History
        const updatedHistory = { ...habit.history };
        updatedHistory[date] = !updatedHistory[date];
        
        return {
          ...habit,
          history: updatedHistory, // Hier wird ein frisches Objekt zugewiesen
        };
      }
      return habit;
    })
  );
};

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Habit Tracker
          </h1>
          <p className="text-slate-500 mt-2 italic">
            "Beständigkeit schlägt Intensität."
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Neues Ziel setzen
          </h2>
          <HabitForm addHabit={addHabit} />
        </section>

        <section>
          <HabitList 
            habits={habits} 
            toggleHabitDate={toggleHabitDate} 
          />
        </section>
      </div>
    </div>
  );
};

export default App;