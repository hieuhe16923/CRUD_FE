export type ValidatedInputProps = {
  label: string;
  placeholder?: string;
  validationFn: () => string | null;
  value: string;
  setValue: () => void;
  submitted: boolean; // truyền từ component cha
};
