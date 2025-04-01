import React, { memo } from 'react'

const LoadingMessage = memo(({ loading }: { loading: boolean }) => {
  console.log("RENDER LoadingMessage");
  return loading ? <div className="text-black">Carregando...</div> : null;
});

export default LoadingMessage