import { makeLoginValidation } from '@/main/factories/validation'
import { ValidationComposite } from '@/main/composites'
import { RequiredFieldValidation, } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('username'),
      new RequiredFieldValidation('password'),
    ]))
  })
})
