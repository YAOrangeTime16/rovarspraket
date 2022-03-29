import React from 'react';
import Form from './components/Form';

function App() {
  return (
    <section className='flex flex-col justify-center p-8 mx-auto lg:w-5/6 xl:w-2/3'>
      <h1 className='text-2xl mb-4'>Rörvarspråket</h1>
      <Form />
    </section>
  );
}

export default App;
