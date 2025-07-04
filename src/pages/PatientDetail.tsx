import { Box, Container, Divider, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePatientSearch } from "../hooks/usePatientSearch";
import { useEffect } from "react";
import PatientSidebar from "../component/Header/PatientSidebar";
import PatientTabs from "../component/Header/PatientTabs";


const PatientDetail = () => {
    const { patients, loading, error, handleSearch, clear } = usePatientSearch();
    const { id } = useParams<{ id: string  }>();
    useEffect(() => {
        if (id) {
            handleSearch(id);
        }
    }, [id])


    return (
        <>
            {patients.length > 0 && <PatientSidebar patient={patients[0]} />}

            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Clinical Data Summary
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This section displays the patient's most recent vital signs and laboratory results. Vitals represent key physiological measurements, while labs provide diagnostic data. Additional clinical information can be accessed through the <strong>More</strong> tab.
                </Typography>
                <Divider sx={{ mt: 2 }} />

                <PatientTabs id={id} />

            </Box>
        </>



    )
}
export default PatientDetail;

