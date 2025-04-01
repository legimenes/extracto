interface LoadingProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
  if (!isLoading) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-t-4 border-t-lime-600 border-gray-200 rounded-full animate-spin"></div>
          <span className="text-white text-lg">Carregando...</span>
        </div>
      </div>
    </>
  )
}

export default Loading