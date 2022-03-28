interface IObjectBase {
  [key: string]: string | number | boolean | null | undefined;
}
export type TCategory = 'Any' | 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas';

export interface IButtonProps {
  label: string;
  bgClass: string;
  type?: string;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IJokeResponseData extends IObjectBase {
  error: boolean;
  category: TCategory;
  type: string;
  setup?: string;
  flags?: any;
  safe: boolean;
  id: number;
  lang: string;
}

export interface IJokeResponseError extends IObjectBase {
  additionalInfo: string;
  code: number;
  message: string;
  timestamp: number;
}

export interface IInputProps {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}