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
<<<<<<< HEAD
  Snackbar,
  Alert,
=======
  FormHelperText,
>>>>>>> master
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
const streetOptions = ['Example Street 1', 'Example Barangay 2'];
const townOptions = ['Example Town 1', 'Example City 2'];
const provinceOptions = ['Example Province 1', 'Example Province 2'];

=======
>>>>>>> master
export default function ApplicationForMinistry() {
  const navigate = useNavigate();
  const [progress] = useState(0.5);

<<<<<<< HEAD
  const [appDate, setAppDate] = useState(null);
=======
  const [appDate, setAppDate] = useState(null); // optional, toggle required logic below
>>>>>>> master
  const [birthDate, setBirthDate] = useState(null);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [gender, setGender] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [province, setProvince] = useState('');

<<<<<<< HEAD
  const [showSuccess, setShowSuccess] = useState(false);

  const buttonColor = '#7bb661';
  const inputHeight = 45;
  const borderRadius = 10;

  const onBack = () => navigate(-1);
  const onNext = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard/ministry/contacts', {
        state: { appDate, birthDate, lastName, firstName, middleName, gender, street, town, province },
      });
    }, 1500);
  };

  const inputSx = {
    backgroundColor: '#eee',
    borderRadius: borderRadius,
    '& .MuiInputBase-root': {
      height: inputHeight,
      paddingLeft: 2,
      backgroundColor: '#eee',
      borderRadius: borderRadius,
      fontSize: 14,
      boxSizing: 'border-box',
    },
    '& .MuiInputBase-input': {
      height: inputHeight,
      padding: '0 14px',
      boxSizing: 'border-box',
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: '#eee',
      opacity: 1,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 600, mx: 'auto', px: 3, py: 4 }}>
        <Paper sx={{ p: 3, position: 'relative' }}>
          {/* Title */}
          <Typography fontWeight="bold" fontSize={20} textAlign="center" mb={1}>
            APPLICATION FOR MINISTRY
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ height: 6, borderRadius: 5, backgroundColor: '#d3d3d3', mb: 3, overflow: 'hidden' }}>
            <Box sx={{ width: `${progress * 100}%`, height: '100%', bgcolor: buttonColor, transition: 'width 0.3s ease' }} />
          </Box>

          {/* Application Date with exact width match */}
          <Box
            sx={{
              width: '100%', // full width inside Paper padding
              mb: 1,
              // Remove any margin/padding so it aligns perfectly with horizontal line below
              marginLeft: 0,
              marginRight: 0,
              px: 0,
            }}
          >
            <DatePicker
              label="Application Date"
              value={appDate}
              onChange={(newVal) => setAppDate(newVal)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  margin="none" // Remove default margin to align edges
                  variant="outlined"
                  sx={{
                    ...inputSx,
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      width: '100%',
                      borderRadius: borderRadius,
                    },
                    '& .MuiInputBase-input': {
                      paddingRight: '30px !important', // space for calendar icon
                      height: inputHeight,
                      boxSizing: 'border-box',
                    },
                    '& .MuiInputAdornment-root': {
                      right: 5,
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: { height: inputHeight },
                  }}
                />
              )}
            />
          </Box>

          <Box component="hr" sx={{ my: 3, borderColor: '#ccc' }} />

          {/* Personal Information */}
          <Typography fontWeight={600} fontSize={15} mb={1}>
            Personal Information
          </Typography>

          {/* Last, First, Middle Names */}
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            sx={inputSx}
            margin="normal"
          />
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            sx={inputSx}
            margin="normal"
          />
          <TextField
            label="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            fullWidth
            sx={inputSx}
            margin="normal"
          />

          {/* Birth Date & Gender side by side */}
          <Grid container spacing={2} mt={1} mb={3}>
            <Grid item xs={6}>
              <Box sx={{ width: '100%' }}>
                <DatePicker
                  label="Birth Date"
                  value={birthDate}
                  onChange={(newVal) => setBirthDate(newVal)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      margin="normal"
                      sx={{
                        ...inputSx,
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          width: '100%',
                          borderRadius: borderRadius,
                        },
                        '& .MuiInputBase-input': {
                          paddingRight: '30px !important',
                          height: inputHeight,
                          boxSizing: 'border-box',
                        },
                        '& .MuiInputAdornment-root': {
                          right: 5,
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        style: { height: inputHeight },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={inputSx} margin="normal">
                <InputLabel sx={{ fontSize: 14 }}>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ fontSize: 14 }}
=======
  const [errors, setErrors] = useState({}); // tracks validation errors

  const buttonColor = '#7bb661';

  // Validation function, returns an errors object
  const validateFields = () => {
    const newErrors = {};

    // Example: make Application Date optional, comment this block if you want req
    // if (!appDate) {
    //   newErrors.appDate = 'Application Date is required';
    // }

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
      // No errors, proceed without showing success message
      setTimeout(() => {
        navigate('/dashboard/ministry/contacts', {
          state: {
            appDate,
            birthDate,
            lastName,
            firstName,
            middleName,
            gender,
            street,
            town,
            province,
          },
        });
      }, 1500);
    } else {
      // Scroll to first errored field (optional)
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  };

  const baseInputHeight = '56px';

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ py: 3, maxWidth: 800, mx: 'auto' }}>
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            textAlign="center"
            sx={{ userSelect: 'none' }}
          >
            APPLICATION FOR MINISTRY
          </Typography>

          <Box
            sx={{
              width: '100%',
              height: 6,
              backgroundColor: '#ddd',
              borderRadius: 5,
              overflow: 'hidden',
              mb: 4,
            }}
          >
            <Box sx={{ width: `${progress * 100}%`, height: '100%', backgroundColor: buttonColor }} />
          </Box>

          {/* Application Date - if required, add error display */}
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
                  InputProps: {
                    sx: {
                      height: baseInputHeight,
                      display: 'flex',
                      alignItems: 'center',
                    },
                  },
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

          {/* Birth Date & Gender */}
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
                    InputProps: {
                      sx: {
                        height: baseInputHeight,
                        display: 'flex',
                        alignItems: 'center',
                      },
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                margin="normal"
                sx={{ height: baseInputHeight }}
                error={Boolean(errors.gender)}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  label="Gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{
                    height: baseInputHeight,
                    display: 'flex',
                    alignItems: 'center',
                  }}
>>>>>>> master
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
<<<<<<< HEAD
=======
                {errors.gender && (
                  <FormHelperText>{errors.gender}</FormHelperText>
                )}
>>>>>>> master
              </FormControl>
            </Grid>
          </Grid>

<<<<<<< HEAD
          <Box component="hr" sx={{ my: 3, borderColor: '#ccc' }} />

          {/* Current Address */}
          <Typography fontWeight={600} fontSize={15} mb={1}>
            Current Address
          </Typography>

          <FormControl fullWidth sx={inputSx} margin="normal">
            <InputLabel sx={{ fontSize: 14 }}>Street/Barangay</InputLabel>
            <Select
              value={street}
              label="Street/Barangay"
              onChange={(e) => setStreet(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {streetOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={inputSx} margin="normal">
            <InputLabel sx={{ fontSize: 14 }}>Town/City</InputLabel>
            <Select
              value={town}
              label="Town/City"
              onChange={(e) => setTown(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {townOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={inputSx} margin="normal">
            <InputLabel sx={{ fontSize: 14 }}>Province</InputLabel>
            <Select
              value={province}
              label="Province"
              onChange={(e) => setProvince(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {provinceOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Buttons row */}
          <Box mt={5} display="flex" justifyContent="space-between">
=======
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
>>>>>>> master
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
<<<<<<< HEAD
                minWidth: 100,
                alignSelf: 'flex-start',
=======
>>>>>>> master
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
<<<<<<< HEAD
                minWidth: 100,
                alignSelf: 'flex-end',
=======
>>>>>>> master
              }}
            >
              Next
            </Button>
          </Box>
        </Paper>
<<<<<<< HEAD

        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Application data saved successfully!
          </Alert>
        </Snackbar>
=======
>>>>>>> master
      </Box>
    </LocalizationProvider>
  );
}