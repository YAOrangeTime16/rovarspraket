import React from 'react';
import {TiWarning} from 'react-icons/ti';
import {IErrorProps} from '../typings/';

export default function Error(props: IErrorProps) {

  return (
    <p className='text-red-800 font-bold bg-pink-200 rounded-md px-4 py-1 flex flex-items-center' aria-hidden={!props.message}>
      <TiWarning className='h-6 w-6 mr-2' />
      <span className='block h-6'>{props.message}</span>
    </p>
  )
}