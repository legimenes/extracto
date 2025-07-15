import { useEffect, useRef, useState } from "react";
import useActivities from "@/hooks/useActivities";
import Loading from "@/components/shared/Loading";
import { ActivityResponse } from "@shared/contracts/activity/ActivityResponse";
import { ExpressionList } from "./ExpressionsList";

interface ActivityModalProps {
  id: number | null;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
};

const ActivityModal = ({ id, open, onClose, onSave }: ActivityModalProps) => {
  const { getActivity, insertActivity, updateActivity, deleteActivity, isActivitiesLoading, activitiesError } = useActivities();
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
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
      const data = await getActivity(id);
      setActivity(data || null);
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
    await deleteActivity(id);
    onSave?.();
    onClose();
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
    if (id === null) {
      await insertActivity({ name, operation });
    } else {
      await updateActivity(id, { name, operation });
    }
    onSave?.();
    onClose();
  }

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
          <Loading isLoading={isActivitiesLoading} />
          {activitiesError && <p className="text-red-500">{activitiesError}</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isActivitiesLoading && (
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
                    disabled={isActivitiesLoading}>
                    Cancelar
                  </button>
                  {id !== null && (
                    <button
                      type="button"
                      className="px-3 py-1 text-sm text-white font-semibold rounded bg-red-600 hover:bg-red-700"
                      onClick={handleDelete}
                      disabled={isActivitiesLoading}
                    >
                      Excluir
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm text-white font-semibold rounded bg-lime-600 hover:bg-lime-700"
                    disabled={isActivitiesLoading}>
                    Salvar
                  </button>
                </div>
              </form>
              {id !== null && activity && (
                <ExpressionList
                  activityId={id}
                  expressions={activity.expressions}
                  onRefresh={handleExpressionRefresh}
                />
              )}              
            </>
          )}
        </div>
      </div>
    </>
  );
};

export { ActivityModal };