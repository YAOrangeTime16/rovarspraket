import axios from 'axios';
import { IJokeResponseData, IJokeResponseError, TCategory } from '../typings';

const vowels = ['a', 'e', 'i', 'o', 'u', 'å', 'ä', 'ö'];
const simbols = ['.', ',', '\'', '?', '!', '/'];
const intact = [...vowels, ...simbols]

export function EncodeText(inputText: string): string {
  // Even though the text has several words or sentences, it splits by word space and saves every word in an array.
  const inputAsArray: string[] = inputText.split(' ');
  // Iterate the array of words.
  const encodedWordsArray: string[] = inputAsArray.map((word: string) => {
    // Lowercase.
    word = word.toLocaleLowerCase();

    let newWord: string = '';
    for (const alphabet of word) {
      newWord += intact.includes(alphabet) ? alphabet : `${alphabet}o${alphabet}`;
    }

    return newWord;
  })

  return encodedWordsArray.join(' ');
}

export function DecodeText(inputText: string): string {
  const inputAsArray: string[] = inputText.split(' ');
  const decodedWordsArray: string[] = inputAsArray.map((word: string) => {
    // Lowercase.
    word = word.toLocaleLowerCase();

    let newWord: string = '';
    for (let i: number = 0; i < word.length;) {
        newWord += word[i];
        i = intact.includes(word[i]) ? i + 1 : i + 3
    }

    return newWord;
  })

  return decodedWordsArray.join(' ')
}

/**
 * Ajax call to api endpoint, and return response.
 *
 * @param category TCategory
 * @returns Promise<IJokeResponseData | IJokeResponseError>
 */
export async function GetAJoke (category: TCategory
   = 'Any'): Promise<IJokeResponseData | IJokeResponseError> {
  const apiEndpoint = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

  return await axios.get(apiEndpoint).then(res => HandleResponse(res.data)).catch(e => e);
}

/**
 * Detect an error from api response, and return error object if error found.
 *
 * @param data IJokeResponseData | IJokeResponseError
 * @returns string | IJokeResponseError
 */
function HandleResponse(data: IJokeResponseData | IJokeResponseError): string | IJokeResponseError {
  if (data.error) {
    throw data;
  }

  return data.setup;
}