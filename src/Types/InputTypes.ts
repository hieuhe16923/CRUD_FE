export type ValidatedInputProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  validationFn: (value: string) => string;
  submitted: boolean;
  type?: string;
};
