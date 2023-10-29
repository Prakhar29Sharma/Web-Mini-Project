import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Under Review',
  'Approved',
  'Published',
];

export default function HorizontalLinearAlternativeLabelStepper(props) {

  const activeStep = props.activeStep;
  let completedStep = 0;
  if (activeStep === 'UnderReview') {
    completedStep = 1;
  } else if (activeStep === 'Approved') {
    completedStep = 2;
  } else if (activeStep === 'Public') {
    completedStep = 3;
  }
  
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={completedStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}