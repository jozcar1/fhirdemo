import { Box, Typography } from "@mui/material";
import { Grid2 as Grid } from '@mui/material'
import Sidebar from "../component/SideBar";
import { useState } from "react";
const FHIR_DOC_BASE_URL = 'https://hl7.org/fhir';

const AddResources = () => {
    //const [selectedResource, setSelectedResource] = useState<string>('Patient');
    const [filter, setFilter] = useState('');
    const [expanded, setExpanded] = useState<string | false>(false);
    const [selectedResource, setSelectedResource] = useState<string>('Patient');
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 3 }}>
                    <Sidebar
                        filter={filter}
                        setFilter={setFilter}
                        expanded={expanded}
                        setExpanded={setExpanded}
                        selectedResource={selectedResource}
                        onSelectResource={setSelectedResource}
                    />
                </Grid>
                {/* Middle Panel: Form Preview */}
                <Grid size={{ xs: 4 }}>

                    <Typography variant="h6" gutterBottom>
                        Create Mock { selectedResource } resource
                    </Typography>
                </Grid>
                {/* Right Panel: Documentation */}
                <Grid size={{ xs: 5 }}>

                    <Typography variant="h6" gutterBottom>
                        HL7 FHIR Documentation
                    </Typography>
                    <Box
                        sx={{
                            height: 600,
                            overflow: 'auto',
                            border: '1px solid #ccc',
                            borderRadius: 2,
                        }}
                    >
                        <iframe
                            title="FHIR Documentation"
                            src={`${FHIR_DOC_BASE_URL}/${selectedResource}.html`}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        />
                    </Box>

                </Grid>

            </Grid>

        </Box>
    )
}

export default AddResources;