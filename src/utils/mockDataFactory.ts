import { populateMockPatient } from "./mockData/patient";

export function mockDataFactory(resourceType:string): any{
    switch(resourceType){
        case 'Patient':
            return populateMockPatient();
            default:
                return {
                    resourceType,
                    info: `Mock data for ${resourceType} not yet implemented, Only Patient is currently implemented`
                }
    }
}