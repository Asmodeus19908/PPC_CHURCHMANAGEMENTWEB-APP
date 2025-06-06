import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';

const massSchedules = {
  [format(new Date(), 'yyyy-MM-dd')]: { title: 'Special Mass (Today)', time: '8:00 am - 9:00 am' },
  '2025-06-02': { title: 'Morning Mass', time: '09:00 am - 10:00 am' },
  '2025-06-08': { title: 'Church Event', time: '3:00 pm - 5:00 pm' },
};

const formatDate = (date) => format(date, 'yyyy-MM-dd');

export default function MassAttendance() {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayPress = (dateStr) => {
    if (massSchedules[dateStr]) {
      setSelectedDate(dateStr);
    } else {
      alert('📭 No schedule for this date.');
    }
  };

  const onAttendPress = () => {
    alert(`✅ Attendance confirmed for ${massSchedules[selectedDate].title} on ${selectedDate}`);
    setSelectedDate(null);
  };

  const onCancelPress = () => {
    setSelectedDate(null);
  };

  const onBack = () => {
    window.history.back();
  };

  // Build calendar grid for current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Fill blanks for first week offset
  const calendarCells = Array(firstDayIndex).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(new Date(year, month, day));
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, bgcolor: '#fff' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: 24, mb: 3, textAlign: 'center' }}>
        Mass and Events Schedule
      </Typography>

      <Paper
        sx={{
          bgcolor: '#def1d7',
          borderRadius: 2,
          p: 3,
          mb: 4,
        }}
        elevation={3}
      >
        {/* Weekday Headers */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1 }}>
          {dayLabels.map((d) => (
            <Typography key={d} align="center" sx={{ fontWeight: 'bold', color: '#000' }}>
              {d}
            </Typography>
          ))}
        </Box>

        {/* Days Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {calendarCells.map((date, idx) => {
            if (!date) return <Box key={idx} sx={{ height: 40 }} />;

            const dateStr = formatDate(date);
            const isScheduled = Boolean(massSchedules[dateStr]);
            const isSelected = selectedDate === dateStr;

            return (
              <Box
                key={idx}
                onClick={() => onDayPress(dateStr)}
                sx={{
                  height: 40,
                  bgcolor: isSelected ? '#1B5E20' : isScheduled ? '#2E7D32' : '#fff',
                  color: isSelected || isScheduled ? '#fff' : '#000',
                  borderRadius: 2,
                  fontWeight: isSelected || isScheduled ? 'bold' : 'normal',
                  textAlign: 'center',
                  lineHeight: '40px',
                  cursor: isScheduled ? 'pointer' : 'default',
                  userSelect: 'none',
                  boxShadow: isSelected ? '0 0 6px 2px rgba(27,94,32,0.6)' : 'none',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    bgcolor: isScheduled && !isSelected ? '#1B5E20' : undefined,
                    color: isScheduled && !isSelected ? '#fff' : undefined,
                  },
                }}
              >
                {date.getDate()}
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Selected Schedule or Prompt */}
      {selectedDate && massSchedules[selectedDate] ? (
        <Paper sx={{ bgcolor: '#e7f5db', borderRadius: 2, p: 3, mb: 4, textAlign: 'center' }} elevation={2}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 22, mb: 1 }}>
            {massSchedules[selectedDate].title}
          </Typography>
          <Typography sx={{ fontSize: 18, mb: 1 }}>{selectedDate}</Typography>
          <Typography sx={{ fontSize: 16, mb: 3 }}>{massSchedules[selectedDate].time}</Typography>

          <Button
            onClick={onAttendPress}
            sx={{
              bgcolor: '#2E7D32',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 2,
              p: '12px 28px',
              mb: 2,
              width: '100%',
              '&:hover': { bgcolor: '#1B5E20' },
            }}
          >
            Attend
          </Button>

          <Button
            onClick={onCancelPress}
            sx={{
              bgcolor: '#777',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 2,
              p: '12px 28px',
              width: '100%',
              '&:hover': { bgcolor: '#444' },
            }}
          >
            Cancel
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ bgcolor: '#e7f5db', borderRadius: 2, p: 3, mb: 4, textAlign: 'center' }} elevation={2}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 17 }}>
            Tap on a <Box component="span" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>highlighted</Box> date to view the schedule
          </Typography>
        </Paper>
      )}

      <Button
        onClick={onBack}
        sx={{
          bgcolor: '#2E7D32',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: 24,
          p: '12px 40px',
          display: 'block',
          mx: 'auto',
          boxShadow: 3,
          fontSize: 16,
          '&:hover': { bgcolor: '#1B5E20' },
        }}
      >
        Back
      </Button>
    </Box>
  );
}