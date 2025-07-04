// src/services/fhirService.ts
import { client } from "fhirclient";
import { normalizeFHIRResponse } from "../utils/fhirUtils";
import { Patient } from "../types/patient/patient";
const fhirClient = client({ serverUrl: 'https://server.fire.ly' });

export const searchPatients = async (searchQuery: string): Promise<any[]> => {
  const isLettersOnly = /^[A-Za-z\s]+$/.test(searchQuery);
  const parts = searchQuery.trim().split(/\s+/);
  let searchParam;

  if (isLettersOnly) {
    const given = parts[0];
    const family = parts[1];
    searchParam = `?_count=10&given=${given}` + (family ? `&family=${family}` : '');
  } else {
    searchParam = `/${parts[0]}`;
  }

  const res = await fhirClient.request(`Patient${searchParam}`);
 return normalizeFHIRResponse<Patient>(res);

};

export const fetchResource = async <T>(url:string): Promise<T[]> => {
  try{
    const res = await fhirClient.request(url);
    return normalizeFHIRResponse<T>(res);

  } catch(err){
    return [];
  }
}

