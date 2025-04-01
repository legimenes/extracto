import React, { memo } from "react";

// Componente memoizado para renderizar a mensagem de carregamento
const LoadingMessage = memo(({ loading }: { loading: boolean }) => {
  console.log("RENDER LoadingMessage");
  return loading ? <div className="text-black">Carregando...</div> : null;
});

// Componente `Home2` que recebe loading e toggleLoading como props
const Home2 = memo(({ loading, toggleLoading }: { loading: boolean, toggleLoading: () => void }) => {
  console.log("RENDER Home2");

  return (
    <>
      <button
        className="mt-3 px-3 py-2 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700"
        onClick={toggleLoading}
      >
        Alternar "Carregando..."
      </button>
      <LoadingMessage loading={loading} />
    </>
  );
});

export default Home2;