import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";


 const PatientDetail = () => {
 const {id} = useParams<{id:string}>();   

    return (
        <Container >
            <Box sx={{ mb: 3, display: 'flex', gap: 2, paddingTop: 5 }}>
                <Typography variant="h4">
                   Patient Detail
                </Typography>
            </Box>
            <Typography>
            <h2>Patient Detail</h2>
      <p>Patient ID: {id}</p>
      {/* You can use this ID to fetch FHIR patient data */}
            </Typography>


        </Container>
    )
}
export default PatientDetail;

