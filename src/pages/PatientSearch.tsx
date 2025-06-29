import {
    Box, Button, Container, TextField, Typography, Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Tab,
    Modal,
    IconButton,
    CircularProgress
} from "@mui/material";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { usePatientSearch } from "../hooks/usePatientSearch";


const PatientSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { patients,loading,error,handleSearch,clear} = usePatientSearch();
    const [open, setOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState<any>(null);
    const navigate = useNavigate();

    const handleClick = (index: number) => {
        setSelectedResource(patients[index]);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedResource(null);
    }
    const handleRowClick = (patientId: string) => {
        navigate(`/patientDetail/${patientId}`);
    }

 
    return (
        <Container sx={{ marginTop: 2 }}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2, paddingTop: 5 }}>
                <TextField
                    label="Search by name or ID"
                    variant="outlined"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    size="small"
                    fullWidth
                />
                <Button variant="contained" onClick={ () => handleSearch(searchQuery)} disabled={!searchQuery}>Search</Button>
                <Button variant="outlined" onClick={() => { setSearchQuery(''); clear(); }}>Clear</Button>
            </Box>
           { loading ? <CircularProgress/> : '' }
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
                                <TableCell><strong>FHIR Resource</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patients.map((p, index) => (
                                <TableRow
                                    key={p.id}
                                    onClick ={()=> handleRowClick(p.id)}
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
                                    <TableCell><Button key={index} onClick={(e) =>{ e.stopPropagation(); handleClick(index)} }>View</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Modal open={open} onClose={handleClose}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                maxHeight: '80%',
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                overflowY: 'auto',
                                borderRadius: 2,
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">FHIR Resource JSON</Typography>
                                <IconButton onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </Box>
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {selectedResource ? JSON.stringify(selectedResource, null, 2) : ''}
                            </pre>
                        </Box>
                    </Modal>
                </TableContainer>

            </>

            ) : ""

            }
        </Container>
    )

}
export default PatientSearch;

