import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      bgcolor='#66347F'
      color="#fff"
      py={4}
      px={2}
      textAlign="center"
      justifyContent='center'
    >
      <Typography variant="body2" gutterBottom>
        &copy; 2023 Your Recipe Website. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Created with ReactJS and TypeScript
      </Typography>
      <Box mt={2}>
        <Link href="/privacy-policy" color="inherit" underline="always">
          Privacy Policy
        </Link>
        {' | '}
        <Link href="/terms-of-service" color="inherit" underline="always">
          Terms of Service
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
