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

export interface CustomInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
}
