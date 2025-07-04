import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import { Observation } from "../types/observation/observation";
import { useState } from "react";

type Props = {
    observations: Observation[];
    label: string;
    //sortOrder?: "asc" | "desc"
}




const ObservationTable = ({ observations,label }: Props) => {
    console.log(observations);
    const [sortOrder,setSortOrder] = useState<"asc" | "desc">("desc");
    const handleSortClick = () => {
        setSortOrder((prev)=> (prev === "asc" ? "desc" : "asc"));
    }

    const sorted = observations.sort((a, b) => {
        const dateA = new Date(a.effectiveDateTime ?? 0).getTime();
        const dateB = new Date(b.effectiveDateTime ?? 0).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#78E2DA" }}>
                            <TableCell><strong>{label}</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                            <TableCell><strong>Components</strong></TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active
                                    direction={sortOrder}
                                    onClick={handleSortClick}
                                >
                                    <strong>Date</strong>
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sorted.map((obs, i) => (
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