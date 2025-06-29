import { useState } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem, Tab, Tabs, Typography } from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VaccinesIcon from "@mui/icons-material/Vaccines";


const PatientTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedMoreResource, setselectedMoreResource] = useState<string | null>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue === 2) {
            setAnchorEl(event.currentTarget as HTMLElement)

        } else {
            setTabIndex(newValue);
            setselectedMoreResource(null);
        }
    }
    const handleMoreSelect = (resource: string) => {
        setselectedMoreResource(resource);
        setAnchorEl(null);
        setTabIndex(2)
    }
    const open = Boolean(anchorEl);
    const menuId = "more-menu"

    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="patient tabs">
                <Tab label="Vitals" />
                <Tab label="Labs" />
                <Tab label="More"
                 aria-controls={menuId} 
                 aria-haspopup="true" 
                 onClick={(e)=> {setAnchorEl(e.currentTarget);}}/>
            </Tabs>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => handleMoreSelect("Medications")}>
                    <ListItemIcon><MedicationIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Medications</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMoreSelect("Conditions")}>
                    <ListItemIcon><LocalHospitalIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Conditions</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMoreSelect("Immunizations")}>
                    <ListItemIcon><VaccinesIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Immunizations</ListItemText>
                </MenuItem>

            </Menu>

            <Box sx={{ mt: 2 }}>
                {tabIndex === 0 && <Typography variant="h6">vitals Content</Typography>}
                {tabIndex === 1 && <Typography variant="h6">Labs Content</Typography>}
                {tabIndex === 2 && selectedMoreResource && (
                    <Typography variant="h6">
                        Displaying resource: {selectedMoreResource}
                    </Typography>
                )}
                {tabIndex === 2 && !selectedMoreResource && (
                    <Typography>Select a resource from the "More" tab.</Typography>
                )}
            </Box>
        </Box>


    )
}

export default PatientTabs;