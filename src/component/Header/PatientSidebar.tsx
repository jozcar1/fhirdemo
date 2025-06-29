import { Box, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Patient } from "../../types/patient/patient";

interface Props {
    patient: Patient;
}


const PatientSidebar: React.FC<Props> = ({ patient }) => {

    const phone = patient.telecom?.find((t) => t.system === "phone")?.value ?? "N/A";
    const addressObj = patient.address?.[0]
    const address = addressObj ? `${addressObj.line?.join(" ") ?? ""}, ${addressObj.city ?? ""},${addressObj.state ?? ""}${addressObj.postalCode ?? ""}` : "N/A";


    return (

        <Box sx={{
            width: 300,
            p: 2,
            borderRight: "1px solid #e0e0e0",
            height: "100%",
            boxSizing: "border-box",
        }}>
            <Typography variant="h6" gutterBottom>
                Patient Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
                 <ListItem disableGutters>
                    <ListItemIcon>
                      <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`${patient.name?.[0]?.given?.join(' ') ?? ''} ${patient.name?.[0]?.family ?? ''}`} />
                </ListItem>

                <ListItem disableGutters>
                    <ListItemIcon>
                        <CakeIcon></CakeIcon>
                    </ListItemIcon>
                    <ListItemText primary={`DOB: ${patient.birthDate ?? "N/A"}`} />
                </ListItem>
                <ListItem disableGutters>
                    <ListItemIcon>
                        <WcIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Gender: ${patient.gender ?? "N/A"}`} />
                </ListItem>

                <ListItem disableGutters>
                    <ListItemIcon>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Phone: ${phone}`} />
                </ListItem>

                <ListItem disableGutters>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Address: ${address}`} />
                </ListItem>

            </Stack>

        </Box>

    )
}
export default PatientSidebar;