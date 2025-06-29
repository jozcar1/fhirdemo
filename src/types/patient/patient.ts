import { FHIRResource } from "../fhirResource";

interface ContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url';
  value?: string;
  use?: 'home' | 'work' | 'temp';
  rank?: number;
  period?: {
    start?: string;
    end?: string;
  }
}
export interface Patient extends FHIRResource {
  name: Array<{
    given?: string[];
    family?: string
  }>;
  gender?: string;
  birthDate?: string;
  telecom?: ContactPoint[];
  address?: Array<{
    line?: string[];
    city?: string;
    state?: string;
    postalCode?:string;
    country?:string;
  }>
}