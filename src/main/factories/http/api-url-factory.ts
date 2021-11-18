export const makeApiUrl = (path: string): string => `${process.env.API_URL}${path}`;

export const makeTestApiUrl = (path: string): string => `${process.env.TEST_API_URL}${path}`;