import dayjs from "dayjs";

const HabitHeatmap = ({ history, onCellClick }) => {
  const weeks = [];
  let currentDay = dayjs().endOf('week'); 

  for (let w = 0; w < 10; w++) {
    const weekDays = [];
    for (let d = 0; d < 7; d++) {
      weekDays.push(currentDay.format("YYYY-MM-DD"));
      currentDay = currentDay.subtract(1, "day");
    }
    weeks.push(weekDays.reverse());
  }
  weeks.reverse();

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 w-fit">
      <div className="flex gap-1.5">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1.5">
            {week.map((day) => {
              // DER ENTSCHEIDENDE CHECK:
              // Wir prüfen, ob in history[day] ein "truthy" Wert steht (true, 1, etc.)
              const isDone = history && history[day] === true;

              return (
                <button
  key={day}
  type="button"
  title={day}
  onClick={() => onCellClick(day)}
  // Wir nutzen Inline-Styles als Backup
  style={{
    backgroundColor: isDone ? '#22c55e' : '#ffffff', // #22c55e ist Tailwind-Grün
    width: '16px',
    height: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '2px',
    cursor: 'pointer'
  }}
  className="transition-all hover:scale-110" // Nur noch für Animation
/>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitHeatmap;