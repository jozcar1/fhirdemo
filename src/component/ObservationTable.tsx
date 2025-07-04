import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Observation } from "../types/observation/observation";

const ObservationTable = ({ observations }: { observations: Observation[] }) => {

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#78E2DA" }}>
                            <TableCell><strong>Type</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                            <TableCell><strong>Components</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {observations.map((obs, i) => (
                            <TableRow key={i}
                                sx={{ backgroundColor: i % 2 === 0 ? "#E0F7F5" : "#FFFFFF" }}>
                                <TableCell>{obs.code?.text ?? 'Unnamed'}</TableCell>
                                <TableCell>
                                    {obs.valueQuantity
                                        ? `${obs.valueQuantity.value}${obs.valueQuantity.unit}` : obs.valueString ?? 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {obs.component && obs.component.length > 0 ? (
                                        obs.component.map((comp, j) => (
                                            <div key={j}>
                                                <strong>{comp.code?.text ?? 'Component'}:</strong>{" "}
                                                {comp.valueQuantity
                                                    ? `${comp.valueQuantity.value} ${comp.valueQuantity.unit}`
                                                    : comp.valueString ?? 'N/A'}
                                            </div>
                                        ))

                                    ) : (
                                        <Typography variant="body2" color="text.secondary">-</Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {obs.effectiveDateTime
                                        ? new Date(obs.effectiveDateTime).toLocaleDateString()
                                        : 'N/A'}
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ObservationTable;