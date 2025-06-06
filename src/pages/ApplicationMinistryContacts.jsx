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
food: false,
children: false,
});

const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

const toggleDepartment = (name) => {
setDepartments((prev) => ({ ...prev, [name]: !prev[name] }));
};

const onPrevious = () => {
navigate('/dashboard/ministry/apply');
};

const onSubmit = () => {
// You can add validation here if needed
alert('Application submitted!');
setShowSubmitSuccess(true);
// Navigate to services or some other page after submit if desired
// navigate('/dashboard/services');
};

return (
<Box sx={{ py: 3, maxWidth: 800, mx: 'auto' }}>
<Paper sx={{ p: 3 }}>
<Box
sx={{
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
mb: 3,
}}
>
<img
src={logo}
alt="Pamukid Presbyterian Church"
style={{ width: 150, height: 'auto', marginBottom: 24 }}
/>
<Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
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
<Box
sx={{ width: '100%', height: '100%', backgroundColor: '#7bb661' }}
/>
</Box>
</Box>

<TextField
      label="Phone Number"
      variant="outlined"
      fullWidth
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      type="tel"
      placeholder="Enter phone number"
      margin="normal"
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
        Department
      </Typography>
    </Box>

    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={departments.music}
            onChange={() => toggleDepartment('music')}
          />
        }
        label="Music Team"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={departments.food}
            onChange={() => toggleDepartment('food')}
          />
        }
        label="Food Team"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={departments.children}
            onChange={() => toggleDepartment('children')}
          />
        }
        label="Children Ministry"
      />
    </FormGroup>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
      <Button variant="outlined" onClick={onPrevious}>
        Previous
      </Button>

      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={!phone}
      >
        Submit
      </Button>
    </Box>
  </Paper>

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
</Box>
);
}