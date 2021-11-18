
export class TooManyRequestsError extends Error {
  constructor () {
    super('Too many requests failed, please wait for 30 seconds to try again.');
    this.name = 'TooManyRequestsError'
  }
}
