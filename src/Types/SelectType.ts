interface Option {
  value: string | number;
  label: string;
}

export interface CustomSelectProps {
  label?: string;
  name: string;
  value: string | number;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
