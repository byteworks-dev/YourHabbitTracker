import HabitHeatmap from "./HabitHeatmap";

const HabitCard = ({ habit, toggleHabitDate }) => { // <--- Hier annehmen!
  return (
    <div className="border p-4 mb-4">
      <h2 className="font-bold">{habit.name}</h2>
      <HabitHeatmap 
        history={habit.history} 
        onCellClick={(date) => toggleHabitDate(habit.id, date)} // <--- Verknüpfen!
      />
    </div>
  );
};

export default HabitCard;