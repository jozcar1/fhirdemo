import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { Grid2 as Grid } from '@mui/material'
import Sidebar from "../component/SideBar";
import { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
import { mockDataFactory } from "../utils/mockDataFactory";
const FHIR_DOC_BASE_URL = 'https://hl7.org/fhir';

const AddResources = () => {

    const [filter, setFilter] = useState('');
    const [expanded, setExpanded] = useState<string | false>(false);
    const [selectedResource, setSelectedResource] = useState<string>('');
    const [jsonText, setJsonText] = useState('');
    const [parsedJson, setParsedJson] = useState<any>(null);

    const [responseId, setResponseId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (selectedResource) {
            const mockData = mockDataFactory(selectedResource);
    const mockText = JSON.stringify(mockData, null, 2);
    setJsonText(mockText);
    setParsedJson(mockData);

        }
    }, [selectedResource])

    async function sendToFirely() {
        try {
            const payload = JSON.parse(jsonText);
            const res = await fetch(`https://server.fire.ly/${selectedResource}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/fhir+json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorBody = await res.text();
                throw new Error(`Error ${res.status}: ${errorBody}`);
            }

            const result = await res.json();
            setResponseId(result.id);
            setErrorMessage(null);
            setOpenSnackbar(true);
        } catch (err: any) {
            setErrorMessage(err.message || 'Unknown error');
            setResponseId(null);
            setOpenSnackbar(true);
        }
    }

    return (
        <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Grid container spacing={0} sx={{ height: '100%' }}>
                <Grid size={{ xs: 2 }} >
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
                <Grid size={{ xs: 5 }}>
                    {selectedResource
                        ? <><Typography variant="h6" gutterBottom>Sample {selectedResource} example </Typography>
                            {parsedJson && !parsedJson.info && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={sendToFirely}
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    Send to Firely
                                </Button>
                            )

                            }
                            {responseId && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    ✅ Resource created with ID: <strong>{responseId}</strong>
                                </Typography>
                            )}
                            <Snackbar
                                open={openSnackbar}
                                autoHideDuration={6000}
                                onClose={() => setOpenSnackbar(false)}
                            >
                                {errorMessage ? (
                                    <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
                                        {errorMessage}
                                    </Alert>
                                ) : (
                                    <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
                                        Resource successfully created with ID: {responseId}
                                    </Alert>
                                )}
                            </Snackbar>
                            <Editor
                                height="calc(100vh - 64px)"
                                defaultLanguage="json"
                                value={jsonText}
                                onChange={(value) => setJsonText(value ?? '')}

                            />
                        </>
                        : 'Please Select a Resource'
                    }
                </Grid>
                {/* Right Panel: Documentation */}
                <Grid size={{ xs: 5 }}>

                    {selectedResource
                        ? <>   <Typography variant="h6" gutterBottom>
                            HL7 FHIR Documentation
                        </Typography>
                            <Box
                                sx={{
                                    height: '100vh',
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
                            </Box></>
                        : ''
                    }
                </Grid>

            </Grid>

        </Box>
    )
}

export default AddResources;