import { Box, Container, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePatientSearch } from "../hooks/usePatientSearch";
import { useEffect } from "react";
import PatientSidebar from "../component/Header/PatientSidebar";


const PatientDetail = () => {
    const { patients, loading, error, handleSearch, clear } = usePatientSearch();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) {
            handleSearch(id);
        }
    }, [id])


    return (
        <>
            {patients.length > 0 && <PatientSidebar patient={patients[0]}  />}
           
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4">Patient Detail</Typography>
                
            </Box>
        </>



    )
}
export default PatientDetail;

