import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function ApplicationMinistryContacts() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departments, setDepartments] = useState({
    music: false,
    youth: false,
    children: false,
    discipleship: false,
    food: false,
    technical: false,
  });

  const [errors, setErrors] = useState({});
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  const toggleDepartment = (name) => {
    setDepartments((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const onPrevious = () => {
    navigate('/dashboard/ministry/apply');
  };

  const validate = () => {
    const newErrors = {};
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    return newErrors;
  };

  const onSubmit = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setRegistrationComplete(true);
      setShowSubmitSuccess(true);
    }
  };

  const onOk = () => {
    // Reset form to empty after submission confirmed
    setPhone('');
    setEmail('');
    setDepartments({
      music: false,
      youth: false,
      children: false,
      discipleship: false,
      food: false,
      technical: false,
    });
    setErrors({});
    setRegistrationComplete(false);
    setShowSubmitSuccess(false);
  };

  const buttonColor = '#7bb661';

  return (
    <Box sx={{ py: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3, minHeight: 400 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <img src={logo} alt="Pamukid Presbyterian Church" style={{ width: 150, marginBottom: 24 }} />
          <Typography variant="h5" fontWeight="bold" mb={2} sx={{ userSelect: 'none' }}>
            APPLICATION FOR MINISTRY
          </Typography>
          <Box sx={{ width: '100%', height: 6, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden', mb: 4 }}>
            <Box sx={{ width: '100%', height: '100%', backgroundColor: buttonColor }} />
          </Box>
        </Box>

        {!registrationComplete ? (
          <>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Enter phone number"
              margin="normal"
              error={Boolean(errors.phone)}
              helperText={errors.phone || ''}
            />

            <TextField
              label="Email Address (optional)"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              margin="normal"
            />

            <Box mt={4} mb={1}>
              <Typography fontWeight={600} variant="subtitle1">
                Ministry Choices
              </Typography>
            </Box>

            <FormGroup>
              {[
                { key: 'music', label: 'Music Ministry' },
                { key: 'youth', label: 'Youth Ministry' },
                { key: 'children', label: 'Children Ministry' },
                { key: 'discipleship', label: 'Discipleship Ministry' },
                { key: 'food', label: 'Food Ministry' },
                { key: 'technical', label: 'Technical Ministry' },
              ].map(({ key, label }) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={departments[key]}
                      onChange={() => toggleDepartment(key)}
                      name={key}
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
              <Button
                variant="contained"
                onClick={onPrevious}
                sx={{
                  backgroundColor: buttonColor,
                  borderRadius: '20px',
                  px: 5,
                  py: 1.5,
                  fontWeight: 'bold',
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#6ba051' },
                  minWidth: 100,
                  alignSelf: 'flex-start',
                }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                onClick={onSubmit}
                disabled={!phone.trim()}
                sx={{
                  backgroundColor: buttonColor,
                  borderRadius: '20px',
                  px: 5,
                  py: 1.5,
                  fontWeight: 'bold',
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#6ba051' },
                  minWidth: 100,
                  alignSelf: 'flex-end',
                }}
              >
                Submit
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              mt: 6,
              userSelect: 'none',
              px: 2,
            }}
          >
            <Typography
              component="p"
              sx={{
                fontWeight: '700',
                fontSize: 24,
                mb: 2,
                color: buttonColor,
              }}
            >
              Registration Complete!
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: 18,
                mb: 4,
                color: 'text.secondary',
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              Your application has been submitted successfully! Please wait for your application to be approved.
            </Typography>
            <Button
              variant="contained"
              onClick={onOk}
              sx={{
                bgcolor: buttonColor,
                color: '#fff',
                fontWeight: '700',
                px: 4,
                py: 1.5,
                fontSize: 16,
                borderRadius: 3,
                '&:hover': { bgcolor: '#6ba051' },
                minWidth: 120,
              }}
            >
              OK
            </Button>
          </Box>
        )}

        <Snackbar
          open={showSubmitSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSubmitSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Application submitted successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}