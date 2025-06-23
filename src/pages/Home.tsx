import { Box, Container, Typography } from "@mui/material";
import Header from "../component/Header/Header";

export default function Home(){

    return (
       <Container >
         <Box sx={{ mb: 3, display: 'flex', gap: 2, paddingTop: 5 }}>
 <Typography variant="h4">
            Welcome to our FHIR Data Explorer
        </Typography>

       
         </Box>
          <Typography>
This site showcases how to seamlessly connect with a FHIR server to retrieve and display clinical data in real time.
Currently, we're fetching and visualizing patient information, with lab results and vital signs coming soon through FHIR Observations.

        </Typography>
       

       </Container>
    )
}