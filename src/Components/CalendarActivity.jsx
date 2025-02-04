import React from 'react';
import { useTheme } from '../Contexts/ThemeContext';

const generateMonthDays = (timestamps) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and days in month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = currentDate.getDate();

  // Filter timestamps to current month only
  const currentMonthTimestamps = timestamps.filter(ts => {
    const d = new Date(ts.toDate());
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const attemptedDays = currentMonthTimestamps.map(ts => 
    new Date(ts.toDate()).getDate()
  );

  // Create array with empty days for calendar grid alignment
  const daysArray = [];
  
  // Add empty days for previous month's dates
  for(let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }

  // Add current month's days
  for(let day = 1; day <= daysInMonth; day++) {
    daysArray.push({
      day,
      isAttempted: attemptedDays.includes(day),
      isToday: day === today
    });
  }

  return daysArray;
};

const CalendarActivity = ({ timestamps }) => {
  const { theme } = useTheme();
  const monthDays = generateMonthDays(timestamps);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className="rounded-lg shadow-lg p-2 w-[300px]"
      style={{ backgroundColor: theme.typeBoxTest, color: theme.textColor }}
    >
      <h2 className="text-lg font-bold text-center mb-2" style={{ color: theme.textColor }}>
        {currentMonth} Activity
      </h2>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {weekdays.map((day, index) => (
          <div key={index} className="text-center font-bold" style={{ color: theme.textColor }}>
            {day}
          </div>
        ))}
        {monthDays.map((dayData, index) => {
          if (!dayData) return <div key={`empty-${index}`} className="w-8 h-8" />;
          
          const { day, isAttempted, isToday } = dayData;
          return (
            <div
              key={day}
              className="w-8 h-8 flex items-center justify-center rounded transition-all relative"
              style={{
                backgroundColor: isAttempted ? theme.textColor : theme.background,
                color: isAttempted ? '#fff' : theme.textColor,
              }}
            >
              {isToday && (
                <div 
                  className="absolute inset-0 border-2 rounded-full"
                  style={{ borderColor: theme.textColor }}
                />
              )}
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-center text-xs">
        <span
          className="inline-block w-3 h-3 rounded mr-1"
          style={{ backgroundColor: theme.textColor }}
        ></span>
        Attempted Days
      </div>
    </div>
  );
};

export default CalendarActivity;