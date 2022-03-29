import React, {BaseSyntheticEvent, useState, useEffect } from 'react';
import {HiSwitchHorizontal} from 'react-icons/hi';
import {EncodeText, DecodeText, GetAJoke} from '../utils/'
import {TRANSLATION_TYPE} from '../typings/enums';
import {IJokeResponseData, IJokeResponseError} from '../typings/';
import Error from './Error';

export default function Form() {
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [translatorType, setTranslatorType] = useState(TRANSLATION_TYPE.ENCODE);

  useEffect(() => {
    translatorType === TRANSLATION_TYPE.ENCODE ? setEncodedText() : setDecodedText();
  }, [input]);

  const setEncodedText = (): void => {
    setOutput(EncodeText(input));
  }

  const setDecodedText = (): void => {
    setOutput(DecodeText(input));
  }

  const setTranslationType = (): void => {
    const newType = translatorType === TRANSLATION_TYPE.DECODE ? TRANSLATION_TYPE.ENCODE : TRANSLATION_TYPE.DECODE;
    setTranslatorType(newType);
    setInput(output);
    setOutput('');
  }

  const getJokeAndEncode = (e: BaseSyntheticEvent): void => {
    setTranslatorType(TRANSLATION_TYPE.ENCODE);
    GetAJoke()
      .then((data: IJokeResponseData | IJokeResponseError) => {
        typeof data === 'string' && setInput(data)
        typeof data === 'object' && data.error && setError(data.message)
      })
      .catch(e => console.error(e))
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={e => e.preventDefault()} className="flex flex-col w-full md:flex-row">
        <div className='flex flex-col w-full'>
          <label htmlFor='input' className='mb-2'>Input text to <span className='font-bold'>{translatorType.toUpperCase()}</span></label>
          <div className='flex flex-col md:flex-row'>
            <textarea id='input' rows={9} cols={40} value={input} onChange={(e) => setInput(e.target.value)} className='border border-solid rounded-md mb-2 p-4 md:mr-2 md:w-1/3'/>
            <p className='w-full min-h-56 p-4 rounded-md bg-gray-200 break-words mb-2 md:mr-2 md:w-1/3'>{output}</p>
            <div className='flex flex-col w-full md:w-1/3'>
              <button type='button' className='bg-teal-600 hover:bg-teal-800 active:bg-teal-900 px-4 text-white rounded-md h-12 mb-2 flex items-center justify-center' onClick={setTranslationType}>
                <HiSwitchHorizontal className='h-12 mr-2' />SWITCH
              </button>
              <button type='button' className='bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 px-4 text-black rounded-md h-12 mb-2' onClick={getJokeAndEncode}>
                Set Joke & Encode
              </button>
            </div>

          </div>
        </div>
      </form>
      {error && <Error message={error}/>}
    </div>
  );
}