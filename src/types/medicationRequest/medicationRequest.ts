import { FHIRResource } from "../fhirResource";

export interface MedicationRequest extends FHIRResource {
  medicationCodeableConcept?: { text?: string };
  authoredOn: string;
  dosageInstruction?: Array<{
    doseAndRate?: Array<{
      doseQuantity?: { value?: string; unit?: string }
    }>
  }>;

}