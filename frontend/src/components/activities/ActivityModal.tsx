import { useEffect, useState } from "react";
import useActivities from "@/hooks/useActivities";
import { ActivityResponse } from "@shared/contracts/activity/ActivityResponse";

interface ActivityModalProps {
  id: number | null;
  onClose: () => void;
}

const ActivityModal = ({ id, onClose }: ActivityModalProps) => {
  const { getActivity } = useActivities();
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) {
      setActivity(null);
      setError(null);
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

  if (id === null || (!loading && !activity)) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-white mb-4">Detalhes da Atividade</h2>
        {loading && <p className="text-neutral-300">Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {activity && !loading && !error && (
          <>
            <p className="text-neutral-300"><strong>ID:</strong> {activity.id}</p>
            <p className="text-neutral-300"><strong>Nome:</strong> {activity.name}</p>
            <p className="text-neutral-300"><strong>Operação:</strong> {activity.operation}</p>
          </>
        )}
        <button
          className="mt-4 px-3 py-1 text-sm text-white font-semibold rounded bg-lime-600 hover:bg-lime-700"
          onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export { ActivityModal };