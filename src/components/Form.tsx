import React, {BaseSyntheticEvent, useState, useEffect } from 'react';
import {HiSwitchHorizontal} from 'react-icons/hi';
import {EncodeText, DecodeText, GetAJoke} from '../utils/'
import {TRANSLATION_TYPE} from '../typings/enums';

export default function Form() {
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [translatorType, setTranslatorType] = useState(TRANSLATION_TYPE.ENCODE);

  useEffect(() => {
    translatorType === TRANSLATION_TYPE.ENCODE ? setEncodedText() : setDecodedText();
  }, [input]);

  const setEncodedText = () => {
    setOutput(EncodeText(input));
  }

  const setDecodedText = () => {
    setOutput(DecodeText(input));
  }

  const setTranslationType = () => {
    const newType = translatorType === TRANSLATION_TYPE.ENCODE ? TRANSLATION_TYPE.DECODE : TRANSLATION_TYPE.ENCODE;
    setTranslatorType(newType);
    setInput(output);
    setOutput('');
  }

  const getJokeAndEncode = (e: BaseSyntheticEvent) => {
    setTranslatorType(TRANSLATION_TYPE.ENCODE);
    GetAJoke()
      .then(data => {
        typeof data === 'string' && setInput(data)
        typeof data === 'object' && data.error && setError(data.message)
      })
      .catch(e => console.error(e))
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="flex flex-col w-full md:flex-row">
      <div className='flex flex-col w-full'>
        <label htmlFor='input' className='mb-2'>Input text: <span className='font-bold'>{translatorType.toUpperCase()}</span></label>
        <div className='flex flex-col md:flex-row'>
          <textarea id='input' rows={9} cols={40} value={input} onChange={(e) => setInput(e.target.value)} className='border border-solid rounded-md mb-2 md:mr-2 md:w-1/3'/>
          <p className='w-full min-h-56 p-4 rounded-md bg-gray-200 break-words mb-2 md:mr-2 md:w-1/3'>{output}</p>
          <div className='flex flex-col w-full md:flex-row md:w-1/3'>
            <button type='button' className='bg-teal-800 px-4 text-white rounded-md h-12 mb-2 md:mr-2 flex items-center justify-center' onClick={setTranslationType}><HiSwitchHorizontal className='h-12 mr-2' />SWITCH</button>
            <button type='button' className='bg-emerald-400 px-4 text-black rounded-md h-12' onClick={getJokeAndEncode}>Set Joke & Encode</button>
          </div>
          <p className='text-red-800' aria-hidden={!error}>{error}</p>
        </div>
      </div>
    </form>
  );
}