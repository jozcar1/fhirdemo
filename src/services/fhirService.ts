// src/services/fhirService.ts
import { client } from "fhirclient";
const fhirClient = client({ serverUrl: 'https://server.fire.ly' });

export const searchPatients = async (searchQuery: string): Promise<any[]> => {
  const isLettersOnly = /^[A-Za-z\s]+$/.test(searchQuery);
  const parts = searchQuery.trim().split(/\s+/);
  let searchParam;

  if (isLettersOnly) {
    const given = parts[0];
    const family = parts[1];
    searchParam = `given=${given}` + (family ? `&family=${family}` : '');
  } else {
    searchParam = `id=${parts[0]}`;
  }

  const res = await fhirClient.request(`Patient?_count=10&${searchParam}`);
  return res.entry?.map((e: any) => e.resource) || [];
};
