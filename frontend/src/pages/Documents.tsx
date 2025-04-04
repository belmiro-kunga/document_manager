import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../services/api';
import { DocumentExtended, DocumentStatus } from '../types/document';

export const Documents: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentExtended | null>(null);
  const queryClient = useQueryClient();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: documentService.getDocuments,
  });

  const createMutation = useMutation({
    mutationFn: documentService.createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setOpenDialog(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: documentService.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const handleCreateDocument = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    createMutation.mutate({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as DocumentStatus,
    });
  };

  const handleDeleteDocument = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Documentos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Novo Documento
        </Button>
      </Box>

      <Grid container spacing={3}>
        {documents?.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {document.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {document.description}
                </Typography>
                <Typography variant="body2">
                  Status: {document.status}
                </Typography>
                <Typography variant="body2">
                  Versão: {document.version}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => setSelectedDocument(document)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteDocument(document.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <form onSubmit={handleCreateDocument}>
          <DialogTitle>Novo Documento</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Título"
              type="text"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="Descrição"
              type="text"
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              select
              margin="dense"
              name="status"
              label="Status"
              fullWidth
              defaultValue={DocumentStatus.DRAFT}
            >
              {Object.values(DocumentStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Criar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}; 