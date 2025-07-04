import { useState } from 'react';
import { fetchResource } from '../services/fhirService';

export const useResourceSearch = <T = any>() => {

    const [resources, setResources] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleSearch = async (searchQuery: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchResource<T>(searchQuery);
            setResources(result);

        } catch (err) {
            console.error('Search error:', err);
            setError('Something went wrong while searching.')
        } finally {
            setLoading(false);
        }
    }

    const clear = () => {
        setResources([]);
    }
    return {
        resources,
        loading,
        error,
        handleSearch,
        clear
    }


}