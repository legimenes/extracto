import { useRef, useState } from "react";
import useExpressions from "@/hooks/useExpressions";

interface ExpressionModalProps {
  activityId: number;
  open: boolean;
  onClose: () => void;
  onRefresh?: () => void;
};

const ExpressionModal = ({ activityId, open, onClose, onRefresh }: ExpressionModalProps) => {
  const { insertExpression } = useExpressions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pattern = formData.get('expression') as string;
    if (!pattern) {
      setError('A expressão é obrigatória');
      return;
    }
    setLoading(true);
    try {
      await insertExpression({ activityId, pattern });
      onRefresh?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao salvar expressão');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-white mb-4">Nova Expressão</h2>
        {loading && <p className="text-neutral-300">Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-neutral-300">Expressão</label>
              <input
                type="text"
                name="expression"
                className="w-full p-2 mt-1 bg-neutral-700 text-neutral-300 rounded"
                placeholder="Digite a expressão"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                className="px-3 py-1 text-sm text-white font-semibold rounded bg-neutral-600 hover:bg-neutral-700"
                onClick={handleCancel}
                disabled={loading}>
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm text-white font-semibold rounded bg-lime-600 hover:bg-lime-700"
                disabled={loading}>
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export { ExpressionModal };