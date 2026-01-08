import dayjs from "dayjs";

const HabitHeatmap = ({ history, onCellClick }) => {
  const weeks = [];
  let currentDay = dayjs().endOf('week'); 

  // Reduziert auf 12 Wochen (ca. 3 Monate)
  for (let w = 0; w < 12; w++) {
    const weekDays = [];
    for (let d = 0; d < 7; d++) {
      weekDays.push(currentDay.format("YYYY-MM-DD"));
      currentDay = currentDay.subtract(1, "day");
    }
    weeks.push(weekDays.reverse());
  }
  weeks.reverse();

  return (
    <div className="mt-2 p-3 bg-white border border-slate-200 rounded-lg w-fit shadow-sm font-sans">
      
      {/* Monats-Header */}
      <div className="flex ml-8 mb-1">
        {weeks.map((week, i) => {
          const firstDay = dayjs(week[0]);
          const prevWeekFirstDay = i > 0 ? dayjs(weeks[i-1][0]) : null;
          const isNewMonth = !prevWeekFirstDay || firstDay.month() !== prevWeekFirstDay.month();

          return (
            <div key={i} className="min-w-[12px] flex-1">
              {isNewMonth ? (
                <span className="text-[9px] text-slate-400 font-medium">
                  {firstDay.format("MMM")}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        {/* Wochentage - Jetzt zentriert zu den Kästchen */}
        <div className="flex flex-col text-slate-400 text-[9px] h-[82px] w-6">
          {/* Jedes div ist genau so hoch wie ein Kästchen + Gap (10px + 2px = 12px) */}
          <div className="h-[12px]"></div> {/* So */}
          <div className="h-[12px] flex items-center">Mon</div>
          <div className="h-[12px]"></div> {/* Di */}
          <div className="h-[12px] flex items-center">Wed</div>
          <div className="h-[12px]"></div> {/* Do */}
          <div className="h-[12px] flex items-center">Fri</div>
          <div className="h-[12px]"></div> {/* Sa */}
        </div>

        {/* Das Gitter */}
        <div className="flex gap-[2px]">
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-[2px]">
              {week.map((day) => {
                const isDone = !!(history && history[day]);
                const isToday = day === dayjs().format("YYYY-MM-DD");

                return (
                  <button
                    key={day}
                    title={day}
                    onClick={() => onCellClick(day)}
                    className={`w-[10px] h-[10px] min-w-[10px] min-h-[10px] rounded-[1.5px] border transition-colors ${
                      isDone 
                        ? "bg-[#216e39] border-[#1b4b2c]" 
                        : "bg-[#ebedf0] border-transparent hover:bg-slate-200"
                    } ${isToday ? "ring-1 ring-blue-400 ring-offset-0" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mini-Legende */}
      <div className="flex justify-end items-center gap-1 mt-2 text-[8px] text-slate-400 uppercase tracking-tighter">
        <span>Less</span>
        {[0, 2, 4].map(lvl => (
          <div key={lvl} className={`w-[8px] h-[8px] rounded-[1px] ${
            lvl === 0 ? "bg-[#ebedf0]" : 
            lvl === 2 ? "bg-[#40c463]" : "bg-[#216e39]"
          }`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default HabitHeatmap;