import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { format } from 'date-fns';

const massSchedules = {
  [format(new Date(), 'yyyy-MM-dd')]: {
    title: 'Special Mass (Today)',
    time: '08:00 am - 09:00 am',
    speaker: 'Pastor Kirby ajero Preza',
  },
  '2025-06-02': {
    title: 'Morning Mass',
    time: '09:00 am - 10:00 am',
    speaker: 'Pastor Kirby ajero Preza',
  },
  '2025-06-08': {
    title: 'Church Event',
    time: '03:00 pm - 05:00 pm',
    speaker: 'Event Coordinator',
  },
};

const formatDate = (date) => format(date, 'yyyy-MM-dd');
const formatWeekday = (date) => format(date, 'EEEE');

export default function MassAttendance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceConfirmed, setAttendanceConfirmed] = useState(false);
  const [confirmedAttendance, setConfirmedAttendance] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayIndex = new Date(year, month, 1).getDay();

  const calendarCells = Array(firstDayIndex).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(new Date(year, month, day));
  }

  const onDayPress = (dateStr) => {
    if (attendanceConfirmed) return;
    if (massSchedules[dateStr]) {
      setSelectedDate(dateStr);
      setAttendanceConfirmed(false);
    } else {
      alert('📭 No schedule for this date.');
    }
  };

  const onAttendPress = () => {
    if (!selectedDate) return;
    setAttendanceConfirmed(true);
  };

  const onConfirmOk = () => {
    setConfirmedAttendance(selectedDate);
    setAttendanceConfirmed(false);
    setSelectedDate(null);
  };

  const onCancelAttendance = () => {
    setConfirmedAttendance(null);
    setSelectedDate(null);
    setAttendanceConfirmed(false);
  };

  const onCancelSelection = () => {
    if (attendanceConfirmed) return;
    setSelectedDate(null);
  };

  const onBack = () => window.history.back();

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        bgcolor: '#fff',
        minHeight: '100vh',
        position: 'relative',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: 20,
          mb: 3,
          textAlign: 'center',
          color: '#000',
        }}
      >
        Mass and Event Schedule
      </Typography>

      <Paper
        sx={{
          bgcolor: '#def1d7',
          borderRadius: 3,
          p: 3,
          mb: 3,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '2px solid #2E7D32',
          pointerEvents: attendanceConfirmed ? 'none' : 'auto',
          userSelect: attendanceConfirmed ? 'none' : 'auto',
          opacity: attendanceConfirmed ? 0.6 : 1,
        }}
        elevation={3}
        aria-label="Mass and Event schedule calendar"
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 2 }}>
          {dayLabels.map((day) => (
            <Typography
              key={day}
              align="center"
              sx={{ fontWeight: '700', color: '#000', fontSize: 15 }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {calendarCells.map((date, idx) => {
            if (!date) return <Box key={`empty-${idx}`} sx={{ height: 40 }} />;
            const dateStr = formatDate(date);
            const isScheduled = Boolean(massSchedules[dateStr]);
            const isSelected = selectedDate === dateStr;
            const isConfirmed = confirmedAttendance === dateStr;

            return (
              <Box
                key={dateStr}
                onClick={() => isScheduled && !attendanceConfirmed && onDayPress(dateStr)}
                sx={{
                  height: 40,
                  bgcolor: isConfirmed
                    ? '#81c784'
                    : isSelected
                    ? '#1B5E20'
                    : isScheduled
                    ? '#2E7D32'
                    : '#fff',
                  color:
                    isSelected || isScheduled || isConfirmed
                      ? '#fff'
                      : '#000',
                  borderRadius: 2,
                  fontWeight:
                    isSelected || isScheduled || isConfirmed
                      ? '700'
                      : '400',
                  textAlign: 'center',
                  lineHeight: '40px',
                  cursor: isScheduled && !attendanceConfirmed ? 'pointer' : 'default',
                  userSelect: 'none',
                  boxShadow:
                    isSelected
                      ? '0 0 6px 2px rgba(27,94,32,0.6)'
                      : 'none',
                  transition: 'background-color 0.3s, color 0.3s',
                  '&:hover': {
                    bgcolor:
                      isScheduled && !isSelected && !attendanceConfirmed
                        ? '#1B5E20'
                        : undefined,
                    color: isScheduled && !isSelected && !attendanceConfirmed ? '#fff' : undefined,
                  },
                }}
                role="button"
                tabIndex={isScheduled && !attendanceConfirmed ? 0 : -1}
                onKeyPress={(e) => {
                  if (isScheduled && (e.key === 'Enter' || e.key === ' ')) {
                    if (!attendanceConfirmed) onDayPress(dateStr);
                  }
                }}
                aria-label={
                  isScheduled
                    ? `${massSchedules[dateStr].title}, Tap to select`
                    : `No scheduled events on ${dateStr}`
                }
              >
                {date.getDate()}
              </Box>
            );
          })}
        </Box>
      </Paper>

      {!selectedDate && !confirmedAttendance && (
        <Paper
          sx={{
            bgcolor: '#e7f5db',
            borderRadius: 3,
            p: 3,
            mb: 4,
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          elevation={2}
        >
          <Typography sx={{ fontWeight: '700', fontSize: 17, color: '#000' }}>
            Tap on a{' '}
            <Box component="span" sx={{ color: '#2E7D32', fontWeight: '700' }}>
              highlighted
            </Box>{' '}
            date to view the schedule
          </Typography>
        </Paper>
      )}

      {!confirmedAttendance && selectedDate && massSchedules[selectedDate] && (
        <Paper
          sx={{
            bgcolor: '#e7f5db',
            borderRadius: 3,
            p: 3,
            mb: 4,
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          elevation={2}
        >
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: 2,
              p: 3,
              mx: 'auto',
              maxWidth: 380,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            <Typography sx={{ fontWeight: '700', fontSize: 22, mb: 1, color: '#000' }}>
              {formatWeekday(new Date(selectedDate))}
            </Typography>
            <Typography sx={{ fontWeight: '600', fontSize: 18, color: '#000', mb: 1 }}>
              {massSchedules[selectedDate].speaker}
            </Typography>
            <Typography sx={{ fontSize: 16, color: '#000', mb: 3 }}>
              ({massSchedules[selectedDate].time})
            </Typography>

            <Button
              onClick={onAttendPress}
              sx={{
                bgcolor: '#c8e6c9',
                color: '#256029',
                fontWeight: '700',
                borderRadius: 3,
                p: '8px 24px',
                mb: 2,
                width: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: '#a5d6a7' },
                mx: 'auto',
                display: 'block',
              }}
            >
              Attend
            </Button>

            <Button
              onClick={onCancelSelection}
              sx={{
                bgcolor: '#777',
                color: '#fff',
                fontWeight: '700',
                borderRadius: 3,
                p: '8px 24px',
                width: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: '#444' },
                mx: 'auto',
                display: 'block',
              }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}

      {attendanceConfirmed && selectedDate && massSchedules[selectedDate] && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#e7f5db',
            borderRadius: 3,
            p: 3,
            zIndex: 20,
            minWidth: 320,
          }}
          aria-modal="true"
          role="dialog"
        >
          <Paper
            sx={{
              bgcolor: '#fff',
              borderRadius: 3,
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              p: 4,
              textAlign: 'center',
              border: '1px solid #d1e7c4',
            }}
            elevation={6}
          >
            <Typography sx={{ fontWeight: '700', fontSize: 20, mb: 3, color: '#000' }}>
              Attendance Confirmed!
            </Typography>
            <Typography sx={{ fontWeight: '600', fontSize: 16, mb: 3, color: '#000' }}>
              For&nbsp;
              <Box component="span" sx={{ fontWeight: '700' }}>
                {massSchedules[selectedDate].title}
              </Box>
              <br />
              On {selectedDate}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                onClick={onConfirmOk}
                sx={{
                  bgcolor: '#4caf50',
                  color: '#fff',
                  fontWeight: '700',
                  borderRadius: 3,
                  p: '8px 24px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  '&:hover': { bgcolor: '#388e3c' },
                  width: 120,
                }}
              >
                OK
              </Button>
              <Button
                onClick={() => setAttendanceConfirmed(false)}
                sx={{
                  bgcolor: '#f44336',
                  color: '#fff',
                  fontWeight: '700',
                  borderRadius: 3,
                  p: '8px 24px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  '&:hover': { bgcolor: '#d32f2f' },
                  width: 120,
                }}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {confirmedAttendance && massSchedules[confirmedAttendance] && (
        <Paper
          sx={{
            bgcolor: '#e7f5db',
            borderRadius: 3,
            p: 3,
            mb: 4,
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: 420,
            mx: 'auto',
          }}
          elevation={2}
          aria-live="polite"
          aria-atomic="true"
        >
          <Typography sx={{ fontWeight: '700', fontSize: 18, mb: 1, color: '#000' }}>
            Attendance confirmed for Mass on
          </Typography>
          <Typography sx={{ fontWeight: '700', fontSize: 22, color: '#2E7D32', mb: 2 }}>
            {confirmedAttendance}
          </Typography>
          <Button
            onClick={onCancelAttendance}
            sx={{
              bgcolor: '#999',
              color: '#fff',
              fontWeight: '700',
              borderRadius: 3,
              p: '8px 24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              '&:hover': { bgcolor: '#666' },
              mx: 'auto',
              display: 'block',
              width: '50%',
            }}
            aria-label="Cancel confirmed attendance"
          >
            Cancel
          </Button>
        </Paper>
      )}

      <Button
        onClick={onBack}
        sx={{
          bgcolor: '#2E7D32',
          color: '#fff',
          fontWeight: '700',
          borderRadius: 24,
          p: '12px 40px',
          display: 'block',
          mx: 'auto',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          fontSize: 16,
          mb: 4,
          '&:hover': { bgcolor: '#1B5E20' },
          pointerEvents: attendanceConfirmed ? 'none' : 'auto',
        }}
        disabled={attendanceConfirmed}
        aria-disabled={attendanceConfirmed}
      >
        Back
      </Button>
    </Box>
  );
}