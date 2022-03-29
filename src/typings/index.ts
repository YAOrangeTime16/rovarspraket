
export type TCategory = 'Any' | 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas';

export interface IJokeResponseData {
  category: TCategory;
  error: boolean;
  flags?: any;
  id: number;
  lang: string;
  message: string;
  safe: boolean;
  setup: string;
  type: string;
}

export interface IJokeResponseError extends IJokeResponseData {
  additionalInfo: string;
  code: number;
  timestamp: number;
}

export interface IErrorProps {
  message: string;
}