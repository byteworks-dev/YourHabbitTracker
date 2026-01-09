import { useState, useEffect, useCallback } from "react"; // useCallback hinzugefügt
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";
import Auth from "./components/Auth";
import { supabase } from "./supabaseClient";

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);

  // 1. ÜBERPRÜFEN OB EINGELOGGT
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

  // 2. DATEN-FUNKTION (mit useCallback stabilisiert für den Linter)
  const fetchHabits = useCallback(async () => {
    if (!session) return;
    
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) console.error("Fehler:", error.message);
    else setHabits(data || []);
  }, [session]);

  // Effekt zum Laden der Daten
  useEffect(() => {
    const load = async () => {
      await fetchHabits();
    };
    load();
  }, [fetchHabits]);

  // 3. LOGIK-FUNKTIONEN
  const addHabit = async (name) => {
    const { data, error } = await supabase
      .from('habits')
      .insert([{ name, user_id: session.user.id, history: [] }])
      .select();

    if (!error) setHabits([...habits, ...data]);
  };

  const toggleHabitDate = async (habitId, date) => {
    const habit = habits.find(h => h.id === habitId);
    let newHistory = Array.isArray(habit.history) ? [...habit.history] : [];

    if (newHistory.includes(date)) {
      newHistory = newHistory.filter(d => d !== date);
    } else {
      newHistory.push(date);
    }

    const { error } = await supabase
      .from('habits')
      .update({ history: newHistory })
      .eq('id', habitId);

    if (!error) {
      setHabits(habits.map(h => h.id === habitId ? { ...h, history: newHistory } : h));
    }
  };

  const deleteHabit = async (id) => {
    if (window.confirm("Diesen Habit wirklich löschen?")) {
      const { error } = await supabase.from('habits').delete().eq('id', id);
      if (!error) setHabits(habits.filter(h => h.id !== id));
    }
  };

  // 4. WEICHE: LOGIN ODER APP
  if (loading) return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  if (!session) return <Auth />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-20">
      <header className="bg-white border-b border-slate-200 pt-16 pb-10 px-4">
        <div className="max-w-3xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Habit Tracker</h1>
            <p className="text-slate-500 text-lg font-medium">Kleine Schritte führen zu großen Veränderungen.</p>
          </div>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="text-xs font-bold text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors mb-2"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 -mt-6">
        <div className="space-y-10">
          <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Neues Ziel setzen</h2>
            <HabitForm addHabit={addHabit} />
          </section>

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