import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import Header from "../component/Header/Header";
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <Container >
            <Paper elevation={3} sx={{
                minHeight: "100vh",          // full height of viewport
                p: 4,                        // padding
                display: "flex",
                flexDirection: "column",
                bgcolor: "#f5f5f5",          // optional: light background
            }}>
                <Typography variant="h5" gutterBottom>
                    FHIR Data Explorer
                </Typography>

                <Typography variant="body1" gutterBottom>
                    This site demonstrates how to seamlessly connect to a FHIR server to retrieve and display clinical data in real time.
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Currently, it fetches and visualizes patient information, including FHIR Observation resources for both labs and vital signs.
                </Typography>

                <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        <strong>Note:</strong> This assumes the patient has lab and vital sign data available on{" "}
                        <Link to="https://server.fire.ly" target="_blank" rel="noopener">
                            https://server.fire.ly
                        </Link>
                        . The site was tested using the sample patient <strong>Tom Brady</strong>, who includes both types of observations.
                    </Typography>
                </Alert>
            </Paper>
        </Container>
    )
}