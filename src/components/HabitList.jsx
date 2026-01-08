import HabitCard from "./HabitCard";

const HabitList = ({ habits, toggleHabitDate }) => { // 1. Hier annehmen
  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          toggleHabitDate={toggleHabitDate} // 2. Hier weitergeben
        />
      ))}
    </div>
  );
};

export default HabitList;