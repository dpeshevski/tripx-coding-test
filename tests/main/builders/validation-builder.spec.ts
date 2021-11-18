import faker from 'faker';

import { RequiredFieldValidation } from '@/validation/validators';
import { ValidationBuilder as sut } from '@/main/builders';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column();

    const validations = sut.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
    ])
  })
})
