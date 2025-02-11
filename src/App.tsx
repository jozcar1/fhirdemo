
import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import './App.css';

interface Patient {
  id: string;
  name: [{
    given: string[];
    family: string;
  }];
  gender?: string;
  birthDate?: string;
}

interface Observation {
  code: {
    text: string;
  };
  valueQuantity?: {
    value: number;
    unit: string;
  };
  valueString?: string;
  effectiveDateTime: string;
}

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('https://hapi.fhir.org/baseR4/Patient?_count=10');
      const data = await response.json();
      setPatients(data.entry.map((e: any) => e.resource));
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchObservations = async (patientId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hapi.fhir.org/baseR4/Observation?patient=${patientId}`);
      const data = await response.json();
      setObservations(data.entry ? data.entry.map((e: any) => e.resource) : []);
      setSelectedPatient(patientId);
    } catch (error) {
      console.error('Error fetching observations:', error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        FHIR Patient Viewer
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Patients
          </Typography>
          <List>
            {patients.map((patient) => (
              <ListItem 
                key={patient.id}
                onClick={() => fetchObservations(patient.id)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: selectedPatient === patient.id ? 'action.selected' : 'inherit',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ListItemText
                  primary={`${patient.name[0]?.given?.join(' ')} ${patient.name[0]?.family}`}
                  secondary={`Gender: ${patient.gender || 'N/A'} | DOB: ${patient.birthDate || 'N/A'}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Lab Values
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : selectedPatient ? (
            observations.length > 0 ? (
              observations.map((obs, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{obs.code.text}</Typography>
                    <Typography>
                      Value: {obs.valueQuantity 
                        ? `${obs.valueQuantity.value} ${obs.valueQuantity.unit}`
                        : obs.valueString || 'N/A'
                      }
                    </Typography>
                    <Typography variant="caption">
                      Date: {new Date(obs.effectiveDateTime).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No observations found for this patient</Typography>
            )
          ) : (
            <Typography>Select a patient to view their lab values</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
