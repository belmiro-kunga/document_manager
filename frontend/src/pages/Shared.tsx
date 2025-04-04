import React from 'react';
import { Box, Typography } from '@mui/material';

export const Shared: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Documentos Compartilhados
      </Typography>
      <Typography>
        Em breve: Lista de documentos compartilhados com você
      </Typography>
    </Box>
  );
}; 