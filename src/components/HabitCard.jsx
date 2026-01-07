function HabitCard({ habit, onToggle }) {
    return (
        <div className="flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition">
            <h2 className={`text-lg font-semibold ${habit.done ? "line-through text-gray-400" : ""}`}>
                {habit.name}</h2>
            <button
        onClick={() => onToggle(habit.id)}
        className={`px-3 py-1 rounded ${
          habit.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
            </button>
        </div>
    );
}

export default HabitCard;