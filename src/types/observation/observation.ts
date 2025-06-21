import { FHIRResource } from "../fhirResource";

interface Coding {
  system?: string;
  code?: string;
  display?: string;
}
interface CodeableConcept {
  coding?: Coding[];
  text?: string;
}

interface Quantity {
  value?: number;
  unit?: string;
  system?: string;
  code?: string;
}


export interface Observation extends FHIRResource {
  code: { text?: string; };
  valueQuantity?: { value?: number; unit?: string };
  valueString?: string;
  effectiveDateTime: string;
  component?: Array<{
    code: CodeableConcept;
    valueQuantity?: Quantity;
    valueString?: string;
  }>;

}