import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemButton, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import fhirResources from '../data/fhirResources.json';
import { useState } from "react";

type SidebarProps = {
  filter: string;
  setFilter: (val: string) => void;
  expanded: string | false;
  setExpanded: (val: string | false) => void;
  selectedResource: string;
  onSelectResource: (resource: string) => void;
};

const Sidebar = ({
    filter,
    setFilter,
    expanded,
    setExpanded,
    selectedResource,
    onSelectResource
}: SidebarProps) => {
    
    const filterResources = () => {
        const searchTerm = filter.toLocaleLowerCase();
        const result: Record<string, string[]> = {};

        Object.entries(fhirResources).forEach(([category, resources]) => {
            const filtered = resources.filter((r) =>
                r.toLocaleLowerCase().includes(searchTerm)
            );
            if (filtered.length > 0)
                result[category] = filtered;
        });
        return result;
    }

    const handleAccordionChange = (category: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
       setExpanded(isExpanded ? category : false)
    }
   
    const filteredData = filterResources();

    return (
        <Box sx={{
            width: 300,
            p: 2,
            borderRight: "1px solid #e0e0e0",
            height: "100%",
            boxSizing: "border-box",
        }}>

            <Typography variant="h5" gutterBottom>
                FHIR Resource List
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                label="Filter resources..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{ mb: 3 }}
            />
            {Object.entries(filteredData).map(([category, resources]) => (
                <Accordion
                    key={category}
                    expanded={expanded === category}
                    onChange={handleAccordionChange(category)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{category} Resources</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            {resources.map((resource) => (
                                <ListItem key={resource} disablePadding>
                                    <ListItemButton
                                    selected={resource === selectedResource}
                                    onClick={()=> onSelectResource(resource)}
                                    >
                                        <Typography>{resource}</Typography>
                                    </ListItemButton>

                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}

            {Object.keys(filteredData).length === 0 && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    No resources found.
                </Typography>
            )}
        </Box>
    )
}

export default Sidebar;