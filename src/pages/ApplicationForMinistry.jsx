import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  FormHelperText,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

const streetOptions = ['Example Street 1', 'Example Barangay 2'];
const townOptions = ['Example Town 1', 'Example City 2'];
const provinceOptions = ['Example Province 1', 'Example Province 2'];

export default function ApplicationForMinistry() {
  const navigate = useNavigate();
  const [progress] = useState(0.5);

  const [appDate, setAppDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [gender, setGender] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [province, setProvince] = useState('');
  const [errors, setErrors] = useState({});

  const buttonColor = '#7bb661';

  // Validation function, returns an errors object
  const validateFields = () => {
    const newErrors = {};
    // If you want Application Date required, uncomment below
    // if (!appDate) newErrors.appDate = 'Application Date is required';

    if (!lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!birthDate) newErrors.birthDate = 'Birth Date is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!street.trim()) newErrors.street = 'Street/Barangay is required';
    if (!town.trim()) newErrors.town = 'Town/City is required';
    if (!province.trim()) newErrors.province = 'Province is required';

    return newErrors;
  };

  const onBack = () => navigate(-1);

  const onNext = () => {
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No errors, proceed
      setTimeout(() => {
        navigate('/dashboard/ministry/contacts', {
          state: { appDate, birthDate, lastName, firstName, middleName, gender, street, town, province },
        });
      }, 1500);
    } else {
      // Optional: scroll to first invalid field
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
    }
  };

  const baseInputHeight = '56px';

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ py: 3, maxWidth: 800, mx: 'auto' }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center" sx={{ userSelect: 'none' }}>
            APPLICATION FOR MINISTRY
          </Typography>

          <Box sx={{ width: '100%', height: 6, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden', mb: 4 }}>
            <Box sx={{ width: `${progress * 100}%`, height: '100%', backgroundColor: buttonColor }} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <DatePicker
              label="Application Date"
              value={appDate}
              onChange={setAppDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                  variant: 'outlined',
                  id: 'appDate',
                  error: Boolean(errors.appDate),
                  helperText: errors.appDate || '',
                  sx: { height: baseInputHeight },
                  InputProps: { sx: { height: baseInputHeight, display: 'flex', alignItems: 'center' } },
                },
              }}
            />
          </Box>

          <Typography fontWeight={600} variant="subtitle1" mt={4} mb={1}>
            Personal Information
          </Typography>

          <TextField
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName || ''}
            InputProps={{ sx: { height: baseInputHeight } }}
          />
          <TextField
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName || ''}
            InputProps={{ sx: { height: baseInputHeight } }}
          />
          <TextField
            label="Middle Name"
            id="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { height: baseInputHeight } }}
          />

          <Grid container spacing={2} mt={1} mb={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Birth Date"
                value={birthDate}
                onChange={setBirthDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    variant: 'outlined',
                    id: 'birthDate',
                    error: Boolean(errors.birthDate),
                    helperText: errors.birthDate || '',
                    sx: { height: baseInputHeight },
                    InputProps: { sx: { height: baseInputHeight, display: 'flex', alignItems: 'center' } },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" sx={{ height: baseInputHeight }} error={Boolean(errors.gender)}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  label="Gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ height: baseInputHeight, display: 'flex', alignItems: 'center' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          <Typography fontWeight={600} variant="subtitle1" mb={1}>
            Current Address
          </Typography>

          <TextField
            label="Street/Barangay"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(errors.street)}
            helperText={errors.street || ''}
            InputProps={{ sx: { height: baseInputHeight } }}
          />
          <TextField
            label="Town/City"
            id="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(errors.town)}
            helperText={errors.town || ''}
            InputProps={{ sx: { height: baseInputHeight } }}
          />
          <TextField
            label="Province"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(errors.province)}
            helperText={errors.province || ''}
            InputProps={{ sx: { height: baseInputHeight } }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button
              variant="contained"
              onClick={onBack}
              sx={{
                backgroundColor: buttonColor,
                borderRadius: '20px',
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                color: '#fff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#6ba051' },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
              sx={{
                backgroundColor: buttonColor,
                borderRadius: '20px',
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                color: '#fff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#6ba051' },
              }}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}