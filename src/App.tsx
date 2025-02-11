
import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, List, ListItem, ListItemText, CircularProgress, TextField, Button, Box } from '@mui/material';
import './App.css';

import { client } from 'fhirclient';

const fhirClient = client({
  serverUrl: 'https://hapi.fhir.org/baseR4'
});

interface FHIRResource {
  resourceType: string;
  id: string;
}

interface Patient extends FHIRResource {
  name: [{
    given: string[];
    family: string;
    text?: string;
    use?: string;
  }];
  gender?: string;
  birthDate?: string;
  address?: Array<{
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
  }>;
}

interface Observation extends FHIRResource {
  status: string;
  code: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text: string;
  };
  valueQuantity?: {
    value: number;
    unit: string;
    system?: string;
    code?: string;
  };
  valueString?: string;
  valueCodeableConcept?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  effectiveDateTime: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  subject?: {
    reference: string;
    type?: string;
  };
}

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fhirClient.request(`Patient?_count=10&name=${searchQuery}&_id=${searchQuery}`);
      setPatients(response.entry?.map((e: any) => e.resource as Patient) || []);
    } catch (error) {
      console.error('Error searching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fhirClient.request(`Patient?_count=10`);
      setPatients(response.entry.map((e: any) => e.resource as Patient));
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchObservations = async (patientId: string) => {
    setLoading(true);
    try {
      // Fetch lab values
      const labResponse = await fhirClient.request(`Observation?patient=${patientId}&category=laboratory`);
      const labObservations = labResponse.entry 
        ? labResponse.entry.map((e: any) => ({...e.resource, type: 'Lab'} as Observation))
        : [];
      
      // Fetch vital signs
      const vitalsResponse = await fhirClient.request(`Observation?patient=${patientId}&category=vital-signs`);
      const vitalObservations = vitalsResponse.entry
        ? vitalsResponse.data.entry.map((e: any) => ({...e.resource, type: 'Vital Sign'} as Observation))
        : [];
      
      // Combine both types of observations
      setObservations([...labObservations, ...vitalObservations]);
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
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Search by name or ID"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          disabled={!searchQuery}
        >
          Search
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => {
            setSearchQuery('');
            setSearchMode(false);
            fetchPatients();
          }}
        >
          Clear
        </Button>
      </Box>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#e3f2fd', mb: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Laboratory Values
                  </Typography>
                  {loading ? (
                    <CircularProgress />
                  ) : selectedPatient ? (
                    observations.filter(obs => obs.type === 'Lab').length > 0 ? (
                      observations
                        .filter(obs => obs.type === 'Lab')
                        .map((obs, index) => (
                          <Card key={index} sx={{ mb: 1, bgcolor: 'white' }}>
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
                      <Typography>No lab values found</Typography>
                    )
                  ) : (
                    <Typography>Select a patient to view their lab values</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#f3e5f5', mb: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Vital Signs
                  </Typography>
                  {loading ? (
                    <CircularProgress />
                  ) : selectedPatient ? (
                    observations.filter(obs => obs.type === 'Vital Sign').length > 0 ? (
                      observations
                        .filter(obs => obs.type === 'Vital Sign')
                        .map((obs, index) => (
                          <Card key={index} sx={{ mb: 1, bgcolor: 'white' }}>
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
                      <Typography>No vital signs found</Typography>
                    )
                  ) : (
                    <Typography>Select a patient to view their vital signs</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
