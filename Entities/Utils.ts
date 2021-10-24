const validateEmptyString = (value: string, valueName: string) => {
  const valid: boolean = value !== "";
  if (!valid) throw new Error(`${valueName} cannot be empty`);
};

const validateYear = (value: number, valueName: string) => {
  const currentYear: number = new Date().getFullYear();
  const valid: boolean = value <= currentYear;

  if (!valid)
    throw new Error(`${valueName} cannot be greater than ${currentYear}`);
};

export { validateEmptyString, validateYear };
