export interface BreedItemProps {
  name: string;
  description: string;
  life?: {
    max: number;
    min: number;
  };
  male_weight?: {
    min: number;
    max: number;
  };
  female_weight?: {
    min: number;
    max: number;
  };
}
