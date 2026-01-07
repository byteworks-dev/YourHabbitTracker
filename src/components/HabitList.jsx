import HabitCard from "./HabitCard";

function HabitList({ habits, onToggle }) {
    return (
        <div>
            {habits.map(habit => (<HabitCard key={habit.id} habit={habit}
                onToggle={onToggle} />
            ))}
        </div>
    );
}

export default HabitList;