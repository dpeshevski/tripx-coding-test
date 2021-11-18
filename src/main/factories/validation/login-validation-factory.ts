import { ValidationComposite } from '@/main/composites';
import { ValidationBuilder as Builder } from '@/main/builders';

export const makeLoginValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('username').required().build(),
  ...Builder.field('password').required().build()
])
