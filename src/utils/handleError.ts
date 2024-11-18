export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return 'Une erreur est survenue';
  }
};
