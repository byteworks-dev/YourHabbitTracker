import { useState, useEffect, } from "react";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";
import Auth from "./components/Auth";
import { supabase } from "./supabaseClient";

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);

  // 1. Authentifizierung prüfen
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Daten laden - Wir definieren die Logik hier, um sie im Effekt zu nutzen
  useEffect(() => {
    // Wir definieren fetchHabits direkt im Effekt, 
    // damit es keine externe Abhängigkeit mehr ist.
    const fetchHabits = async () => {
      if (!session) return;
      
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) console.error("Fehler:", error.message);
      else setHabits(data || []);
    };

    fetchHabits();
  }, [session]); // Der Effekt feuert NUR, wenn sich die session ändert

  // 3. Logik-Aktionen (add, toggle, delete bleiben gleich)
  const addHabit = async (name) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from('habits')
      .insert([{ name, user_id: session.user.id, history: [] }])
      .select();
    if (!error) setHabits(prev => [...prev, ...data]);
  };

  const toggleHabitDate = async (habitId, date) => {
    const habit = habits.find(h => h.id === habitId);
    let newHistory = Array.isArray(habit.history) ? [...habit.history] : [];
    newHistory = newHistory.includes(date) ? newHistory.filter(d => d !== date) : [...newHistory, date];

    const { error } = await supabase.from('habits').update({ history: newHistory }).eq('id', habitId);
    if (!error) setHabits(prev => prev.map(h => h.id === habitId ? { ...h, history: newHistory } : h));
  };

  const deleteHabit = async (id) => {
    if (window.confirm("Löschen?")) {
      const { error } = await supabase.from('habits').delete().eq('id', id);
      if (!error) setHabits(prev => prev.filter(h => h.id !== id));
    }
  };

  if (loading) return <div className="bg-[#0f172a] h-screen text-white p-10">Lade Dashboard...</div>;
  if (!session) return <Auth />;

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 antialiased overflow-hidden">
      
      {/* SIDEBAR - Fixierte Breite, dunklerer Hintergrund */}
      <aside className="w-64 bg-[#111827] border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-black text-white italic tracking-tighter">
            Your<span className="text-indigo-500">Habit</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 mt-4">
          <div className="bg-indigo-600/10 text-indigo-400 px-4 py-3 rounded-xl border border-indigo-500/20 font-bold flex items-center gap-3">
            <span>🚀</span> Dashboard
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full py-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT - Scrollbar */}
      <main className="flex-1 overflow-y-auto bg-[#0f172a] flex flex-col">
        <header className="px-10 py-8 sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">Willkommen!</h2>
          <p className="text-slate-500 text-sm mt-1">Du hast heute {habits.length} Gewohnheiten im Fokus.</p>
        </header>

        <div className="px-10 pb-20 max-w-5xl w-full mx-auto space-y-12">
          {/* Formular Card */}
          <section className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6 px-2">Neues Ziel hinzufügen</h3>
            <HabitForm addHabit={addHabit} />
          </section>

          {/* Habits Grid */}
          <section>
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