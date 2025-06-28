import { useState } from "react";
import { searchPatients } from "../services/fhirService";

export const usePatientSearch =() => {
    const [patients,setPatients] = useState<any[]>([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);

    const handleSearch = async (searchQuery:string) => {
        try{
            setLoading(true);
            setError(null);
            const result = await searchPatients(searchQuery);
            setPatients(result);

        } catch (err){
            console.error('Search error:',err);
            setError('Something went wrong while searching.')

        } finally{
            setLoading(false);
        }
    };

    const clear = () => {
        setPatients([]);
    }

    return {
        patients,
        loading,
        error,
        handleSearch,
        clear
    }
}