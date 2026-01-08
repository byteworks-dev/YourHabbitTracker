import { useState } from "react";

function HabitForm({ addHabit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addHabit(name);  // nur der Name, kein Objekt!
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={name}             // ❌ nicht value={habit}
        onChange={(e) => setName(e.target.value)}
        placeholder="Neuen Habit hinzufügen"
        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Hinzufügen
      </button>
    </form>
  );
}

export default HabitForm;