import { useState } from 'react';
import {
  Container, Card, CardContent, Typography, Grid, List, ListItem, ListItemText,
  CircularProgress, TextField, Button, Box
} from '@mui/material';
import './App.css';
import { client } from 'fhirclient';
import { Patient } from './types/patient/patient';
import { Observation } from './types/observation/observation';
import { MedicationRequest } from './types/medicationRequest/medicationRequest';


const fhirClient = client({ serverUrl: 'https://server.fire.ly' });


type ObservationWithType = Observation & { type: 'Lab' | 'Vital Signs' };
type MedicationRequestWithType = MedicationRequest & { type: 'MedicationRequest' };

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [observations, setObservations] = useState<ObservationWithType[]>([]);
  const [medications, setMedications] = useState<MedicationRequestWithType[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      setLoading(true);
      const isLettersOnly = /^[A-Za-z\s]+$/.test(searchQuery);
      const parts = searchQuery.trim().split(/\s+/);
      const firstName = parts[0];
      const lastName = parts[1];
      const searchParam = isLettersOnly ? `given=${firstName}&family=${lastName}` : `_id=${searchQuery}`;

      const res = await fhirClient.request(`Patient?_count=10&${searchParam}`);
      setPatients(res.entry?.map((e: any) => e.resource) || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientData = async (patientId: string) => {
    setLoading(true);
    try {
      const [vitals, lab, meds] = await Promise.all([
        fhirClient.request(`Observation?subject=Patient/${patientId}&category=vital-signs`),
        fhirClient.request(`Observation?subject=Patient/${patientId}&category=laboratory`),
        fhirClient.request(`MedicationRequest?subject=Patient/${patientId}`)
      ]);

      const labs: ObservationWithType[] = lab.entry?.map((e: any) => ({ ...e.resource, type: 'Lab' })) || [];
      const vitalsData: ObservationWithType[] = vitals.entry?.map((e: any) => ({ ...e.resource, type: 'Vital Signs' })) || [];
      const medsData: MedicationRequestWithType[] = meds.entry?.map((e: any) => ({ ...e.resource, type: 'MedicationRequest' })) || [];

      setObservations([...vitalsData, ...labs]);
      setMedications(medsData);
      setSelectedPatient(patientId);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderObservationCards = (type: 'Lab' | 'Vital Signs') => {
    const filtered = observations.filter(obs => obs.type === type);
    if (!selectedPatient) return <Typography>Select a patient to view {type.toLowerCase()}</Typography>;
    if (loading) return <CircularProgress />;
    if (!filtered.length) return <Typography>No {type.toLowerCase()} found</Typography>;

    return filtered.map((obs, i) => (
      <Card key={i} sx={{ mb: 1, bgcolor: 'white' }}>
        <CardContent>

          <Typography variant="h6">{obs.code.text || 'Unnamed'}</Typography>

          {obs.valueQuantity ? (
            <Typography>Value: {obs.valueQuantity.value} {obs.valueQuantity.unit}</Typography>
          ) : obs.valueString ? (
            <Typography>Value: {obs.valueString}</Typography>
          ) : null}

          {obs.component && obs.component.length > 0 && (
            <>
              <Typography variant="subtitle2">Components:</Typography>
              {obs.component.map((comp, j) => (
                <Typography key={j} sx={{ ml: 2 }}>
                  {comp.code?.text || 'Component'}:{" "}
                  {comp.valueQuantity
                    ? `${comp.valueQuantity.value} ${comp.valueQuantity.unit}`
                    : comp.valueString ?? 'N/A'}
                </Typography>
              ))}
            </>
          )}

          <Typography variant="caption">
            Date: {new Date(obs.effectiveDateTime).toLocaleDateString()}
          </Typography>

        </CardContent>
      </Card>
    ));
  };

  const renderMedicationCards = () => {
    if (!selectedPatient) return <Typography>Select a patient to view medications</Typography>;
    if (loading) return <CircularProgress />;
    if (!medications.length) return <Typography>No medications found</Typography>;

    return medications.map((med, i) => (
      <Card key={i} sx={{ mb: 1, bgcolor: 'white' }}>
        <CardContent>
          <Typography variant="h6">{med.medicationCodeableConcept?.text ?? 'Unnamed Medication'}</Typography>
          <Typography>
            Dose: {med.dosageInstruction?.[0]?.doseAndRate?.[0]?.doseQuantity
              ? `${med.dosageInstruction[0].doseAndRate[0].doseQuantity.value} ${med.dosageInstruction[0].doseAndRate[0].doseQuantity.unit}`
              : 'N/A'}
          </Typography>
          <Typography variant="caption">
            Date: {new Date(med.authoredOn).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Container sx={{ marginTop: -2 }}>
      <Box sx={{
        width: '100%', backgroundColor: '#0073e0', padding: 3, color: 'white',
        borderRadius: 1, margin: -3
      }}>
        <Typography variant="h4" gutterBottom>FHIR Patient Viewer</Typography>
      </Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, paddingTop: 5 }}>
        <TextField
          label="Search by name or ID"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch} disabled={!searchQuery}>Search</Button>
        <Button variant="outlined" onClick={() => { setSearchQuery(''); setPatients([]); }}>Clear</Button>
      </Box>

      <Typography variant="h5" gutterBottom>Patients</Typography>
      <List sx={{ backgroundColor: '#78E2DA', color: '#002569' }}>
        {patients.map(p => (
          <ListItem
            key={p.id}
            onClick={() => fetchPatientData(p.id)}
            sx={{
              cursor: 'pointer',
              bgcolor: selectedPatient === p.id ? 'action.selected' : 'inherit',
              '&:hover': { bgcolor: '#78E2DA' }
            }}
          >
            <ListItemText

              primary={`${p.name?.[0]?.given?.join(' ') ?? ''} ${p.name?.[0]?.family ?? ''}`}
              secondary={
                <>
                  <Typography variant="body2">
                    Gender: {p.gender ?? 'N/A'} | DOB: {p.birthDate ?? 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    Email: {p.telecom?.[1]?.value ?? 'N/A'}
                  </Typography>
                </>


              }

            />
          </ListItem>
        ))}
      </List>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#308229' }}>
            <CardContent>
              <Typography variant="h5">Vital Signs</Typography>
              {renderObservationCards('Vital Signs')}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e65722' }}>
            <CardContent>
              <Typography variant="h5">Lab Results</Typography>
              {renderObservationCards('Lab')}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#C28110' }}>
            <CardContent>
              <Typography variant="h5">Medications</Typography>
              {renderMedicationCards()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
