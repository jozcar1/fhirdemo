import { faker } from "@faker-js/faker";
import patientSchema from '../../schemas/patient.json'


export function populateMockPatient(template = patientSchema) {
    return {
        ...template,
        id: faker.random.numeric(16),
        name: [{ family: faker.name.lastName(), given: [faker.name.firstName()] }],
        gender: faker.name.sexType(),
        birthDate: faker.date.birthdate({ min: 1950, max: 2000, mode: 'year' }).toISOString().split('T')[0],
        address: [{
            line: [faker.address.streetAddress()],
            city: faker.address.city(),
            state: faker.address.state(),
            postalCode: faker.address.zipCode()
        }],
        telecom: [{ system: 'phone', value: faker.phone.number(), use: 'home' }],
        contact: [{
            name: {
                family: faker.name.lastName(),
                given: [faker.name.firstName()]
            }
        }]
    };
}