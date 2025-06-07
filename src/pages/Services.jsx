import React from 'react';
import { Box, Typography, Grid, Card, Paper, useTheme } from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  Church as ChurchIcon,
  Article as ArticleIcon,
  CardGiftcard as DonateIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import logo from '../assets/logo.png';

const massSchedules = {
  '2025-06-02': {
    title: 'Morning Mass',
    time: '09:00 am - 10:00 am',
    speaker: 'Pastor Kirby Ajero Preza',
  },
  '2025-06-07': {
    title: 'Special Mass',
    time: '08:00 am - 09:00 am',
    speaker: 'Pastor Kirby Ajero Preza',
  },
  '2025-06-08': {
    title: 'Church Event',
    time: '03:00 pm - 05:00 pm',
    speaker: 'Event Coordinator',
  },
};

export default function Services() {
  const navigate = useNavigate();
  const theme = useTheme();

  // No filtering on date; show all items
  const eventsArray = Object.entries(massSchedules)
    .map(([dateStr, details]) => ({
      dateStr,
      date: parseISO(dateStr),
      ...details,
    }))
    .sort((a, b) => a.date - b.date);

  // Separate mass and non-mass events by title keyword
  const masses = eventsArray.filter((e) => e.title.toLowerCase().includes('mass'));
  const otherEvents = eventsArray.filter((e) => !e.title.toLowerCase().includes('mass'));

  const services = [
    {
      title: 'Mass and Events Schedule',
      description: 'Join us for Sunday worship and Fun events!',
      icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
      path: '/dashboard/mass-attendance',
      color: theme.palette.primary.light,
    },
    {
      title: 'Apply for Ministry',
      description: 'Ready to Serve? Answer Your Calling with Our Ministry Program!',
      icon: <ChurchIcon sx={{ fontSize: 40 }} />,
      path: '/dashboard/ministry/apply',
      color: theme.palette.primary.light,
    },
    {
      title: 'Baptismal',
      description: 'Ready to take the plunge? Sign up for our baptism class and dive into a meaningful journey of faith.',
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      path: '/dashboard/baptismal-certificate',
      color: theme.palette.primary.light,
    },
    {
      title: 'Donate',
      description: "Support our church's mission through your generous donations.",
      icon: <DonateIcon sx={{ fontSize: 40 }} />,
      path: '/donate',
      color: theme.palette.primary.light,
    },
  ];

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="Pamukid Presbyterian Church" style={{ width: 150, marginBottom: 24 }} />
        <Typography variant="h4" sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold', textAlign: 'center' }}>
          Church Services
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}>
          Access various church services and participate in our community activities
        </Typography>
      </Box>

      {/* Services cards */}
      <Grid container spacing={3} mb={6}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.title}>
            <Card
              onClick={() => navigate(service.path)}
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box sx={{ color: theme.palette.primary.main, bgcolor: theme.palette.primary.light, p: 1, borderRadius: 1, width: 'fit-content' }}>
                {service.icon}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {service.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
                {service.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mass Schedule */}
      <Box sx={{ mt: 6 }}>
        <Paper sx={{ p: 3, bgcolor: theme.palette.background.paper }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}>
            Mass Schedule
          </Typography>
          {masses.length > 0 ? (
            masses.map(({ dateStr, title, time, speaker }) => (
              <Box
                key={dateStr}
                sx={{
                  mb: 2,
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Typography fontWeight="600" color="text.primary">
                  {format(parseISO(dateStr), 'EEEE, MMMM d, yyyy')}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pastor: {speaker}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No upcoming mass scheduled.</Typography>
          )}

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mt: 4, mb: 2 }}>
            Event Schedule
          </Typography>
          {otherEvents.length > 0 ? (
            otherEvents.map(({ dateStr, title, time, speaker }) => (
              <Box
                key={dateStr}
                sx={{
                  mb: 2,
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Typography fontWeight="600" color="text.primary">
                  {format(parseISO(dateStr), 'EEEE, MMMM d, yyyy')}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Speaker: {speaker}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No upcoming events scheduled.</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}