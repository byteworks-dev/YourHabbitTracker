import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'

function App() {
  const [habits, setHabits] = useState([]);

  const addHabit = (habit) => setHabits([...habits, habit]);
  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">HappyHabbit Tracker</h1>
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} onToggle={toggleHabit} />
    </div>
  );;
}

export default App
