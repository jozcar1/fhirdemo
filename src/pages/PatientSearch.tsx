import {
    Box, Button, Container,TextField, Typography, Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper
} from "@mui/material";
import { useState } from "react";
import { Patient } from "../types/patient/patient";
import { client } from "fhirclient";
const fhirClient = client({ serverUrl: 'https://server.fire.ly' });

const PatientSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const isLettersOnly = /^[A-Za-z\s]+$/.test(searchQuery);
            const parts = searchQuery.trim().split(/\s+/);
            let searchParam;
            if (isLettersOnly) {
                const given = parts[0];
                const family = parts[1];
                searchParam = `given=${given}` + (family ? `&family=${family}` : '');
            } else {
                searchParam = `id=${parts[0]}`;
            }
            const res = await fhirClient.request(`Patient?_count=10&${searchParam}`);
            setPatients(res.entry?.map((e: any) => e.resource) || []);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container sx={{ marginTop: -2 }}>
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

            {patients.length > 0 ? (<>
                <Typography variant="h5" gutterBottom>Patients</Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Table sx={{ minWidth: 650 }} aria-label="patient table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#78E2DA' }}>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Gender</strong></TableCell>
                                <TableCell><strong>Date of Birth</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patients.map((p, index) => (
                                <TableRow
                                    key={p.id}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? '#E0F7F5' : '#FFFFFF',
                                        '&:hover': {
                                            backgroundColor: '#B2EBE8',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <TableCell>
                                        {`${p.name?.[0]?.given?.join(' ') ?? ''} ${p.name?.[0]?.family ?? ''}`}
                                    </TableCell>
                                    <TableCell>{p.gender ?? 'N/A'}</TableCell>
                                    <TableCell>{p.birthDate ?? 'N/A'}</TableCell>
                                    <TableCell>{p.telecom?.[1]?.value ?? 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                </TableContainer>


            </>


            ) : ""

            }


        </Container>
    )

}
export default PatientSearch;

