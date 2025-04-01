import React, { memo, useState } from 'react'

const LoadingMessage = memo(({ loading }: { loading: boolean }) => {
  console.log('RENDER LoadingMessage');
  return loading ? <div className="text-black">Carregando [1]...</div> : null;
});

const LoadingMessageMemo = memo(()  => {
  const [text, setText] = useState("Loaded");

  console.log('RENDER LoadingMessageMemo');

  const handleClick = () => {
    setText(`${Math.random()}`);
  };

  return (
    <>
      <button
        className="mt-3 px-3 py-1 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700"
        onClick={handleClick}>
        Change
      </button>
      <div className="text-black">{text}</div>
    </>
  )});

const Home = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleClick1 = () => {
    setLoading1(prev => !prev);
  };

  const handleClick2 = () => {
    setLoading2(prev => !prev);
  };

  console.log('RENDER Home');

  return (
    <>
      <div className="flex flex-col">
        <button
          className="mt-3 px-3 py-1 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700"
          onClick={handleClick1}>
          Carregar 1
        </button>
        <LoadingMessage loading={loading1} />

        <button
          className="mt-3 px-3 py-1 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700"
          onClick={handleClick2}>
          Carregar 2
        </button>
        {loading2 && <div className="text-black">Carregando [2]...</div>}

        <LoadingMessageMemo />
      </div>
    </>
  )
}

export default Home