import { useEffect, useRef, useState } from "react";
import useActivities from "@/hooks/useActivities";
import useExpressions from "@/hooks/useExpressions";
import { ActivityResponse } from "@shared/contracts/activity/ActivityResponse";
import { ExpressionModal } from "./ExpressionModal";

interface ActivityModalProps {
  id: number | null;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
};

const ActivityModal = ({ id, open, onClose, onSave }: ActivityModalProps) => {
  const { getActivity, insertActivity, updateActivity, deleteActivity } = useActivities();
  const { deleteExpression } = useExpressions();
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpressionModalOpen, setIsExpressionModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (id === null) {
      setActivity(null);
      setError(null);
      if (formRef.current) {
        formRef.current.reset();
      }
      return;
    }
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const data = await getActivity(id);
        setActivity(data || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar atividade');
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!open) {
    return null;
  }

  const handleDelete = async () => {
    if (id === null) return;
    const confirmed = window.confirm('Confirma a exclusão desta atividade e todas as suas expressões?');
    if (!confirmed) return;
    setLoading(true);
    try {
      await deleteActivity(id);
      onSave?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao excluir atividade');
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
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const operation = formData.get('operation') as string;
    if (!name || !operation) {
      setError('Nome e Operação são obrigatórios');
      return;
    }
    setLoading(true);
    try {
      if (id === null) {
        await insertActivity({ name, operation });
      } else {
        await updateActivity(id, { name, operation });
      }
      onSave?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao salvar atividade');
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteExpression = async (expressionId: number) => {
    const confirmed = window.confirm('Confirma a exclusão desta expressão?');
    if (!confirmed) return;
    setLoading(true);
    try {
      await deleteExpression(expressionId);
      if (id !== null) {
        const data = await getActivity(id);
        setActivity(data || null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao excluir expressão');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenExpressionModal = () => {
    setIsExpressionModalOpen(true);
  };

  const handleCloseExpressionModal = () => {
    setIsExpressionModalOpen(false);
  };

  const handleExpressionRefresh = async () => {
    if (id !== null) {
      const data = await getActivity(id);
      setActivity(data || null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-white mb-4">{id === null ? 'Nova Atividade' : 'Editar Atividade'}</h2>
          {loading && <p className="text-neutral-300">Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && (
            <>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-neutral-300">ID</label>
                  <input
                    type="text"
                    name="id"
                    defaultValue={activity?.id || ''}
                    disabled
                    className="w-full p-2 mt-1 bg-neutral-700 text-neutral-300 rounded"/>
                </div>
                <div>
                  <label className="text-neutral-300">Nome</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={activity?.name}
                    className="w-full p-2 mt-1 bg-neutral-700 text-neutral-300 rounded"
                    placeholder="Digite o nome da atividade"/>
                </div>
                <div>
                  <label className="text-neutral-300">Operação</label>
                  <select
                    name="operation"
                    defaultValue={activity?.operation}
                    className="w-full p-2 mt-1 bg-neutral-700 text-neutral-300 rounded">
                    <option value="">Selecione</option>
                    <option value="C">Crédito</option>
                    <option value="D">Débito</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm text-white font-semibold rounded bg-neutral-600 hover:bg-neutral-700"
                    onClick={handleCancel}
                    disabled={loading}>
                    Cancelar
                  </button>
                  {id !== null && (
                    <button
                      type="button"
                      className="px-3 py-1 text-sm text-white font-semibold rounded bg-red-600 hover:bg-red-700"
                      onClick={handleDelete}
                      disabled={loading}
                    >
                      Excluir
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm text-white font-semibold rounded bg-lime-600 hover:bg-lime-700"
                    disabled={loading}>
                    Salvar
                  </button>
                </div>
              </form>
              {id !== null && (
                <div className="mt-6">
                  {activity?.expressions && activity.expressions.length > 0 ? (
                    <div className="overflow-auto max-h-48">
                      <table className="min-w-full bg-neutral-900 border-collapse border border-neutral-700 select-none">
                        <thead className="sticky top-0">
                          <tr className="bg-neutral-900 text-neutral-400">
                            <th className="pl-2 text-start cursor-pointer">
                              <button
                                className="px-3 py-1 text-sm text-white font-semibold rounded bg-lime-600 hover:bg-lime-700"
                                onClick={handleOpenExpressionModal}
                                disabled={loading}>
                                +
                              </button>
                              &nbsp;Expressão
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {activity.expressions.map((expression) => (
                            <tr
                              key={expression.id}
                              className="border border-neutral-700 hover:bg-neutral-800">
                              <td className="p-2">{expression.pattern}</td>
                              <td className="p-2 text-right">
                                <button
                                  className="px-2 py-1 text-xs text-white font-semibold rounded bg-red-600 hover:bg-red-700"
                                  onClick={() => handleDeleteExpression(expression.id)}
                                  disabled={loading}>
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-neutral-300">Nenhuma expressão associada</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {id !== null && (
        <ExpressionModal
          activityId={id}
          open={isExpressionModalOpen}
          onClose={handleCloseExpressionModal}
          onRefresh={handleExpressionRefresh}
        />
      )}
    </>
  );
};

export { ActivityModal };