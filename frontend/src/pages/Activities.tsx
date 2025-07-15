import { useEffect, useState } from "react";
import useActivities from "@/hooks/useActivities";
import Loading from "@/components/shared/Loading";
import { ActivityModal } from "@/components/activities/ActivityModal";
import { ActivityResponse } from "@shared/contracts/activity/ActivityResponse";

const Activities = () => {
  const { activities, getActivities, isActivitiesLoading, activitiesError } = useActivities();
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = (activity: ActivityResponse) => {
    setSelectedActivityId(activity.id);
    setIsActivityModalOpen(true);
  };

  const handleCreateActivity = () => {
    setSelectedActivityId(null);
    setIsActivityModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedActivityId(null);
    setIsActivityModalOpen(false);
  };

  const handleSave = async () => {
    await getActivities();
  };

  return (
    <>
      <h1 className="border-b border-gray-200 mb-6 font-bold text-2xl">Atividades</h1>
      <div className="flex items-center justify-center pb-6">
        <button
          className="mr-4 px-3 py-1 text-sm text-white font-semibold rounded border-0 bg-lime-600 hover:bg-lime-700"
          onClick={handleCreateActivity}>
          Criar atividade
        </button>
      </div>
      <div className="mx-auto">
        <Loading isLoading={isActivitiesLoading} />
        {activitiesError && <p className="text-red-500">{activitiesError}</p>}
        {!isActivitiesLoading && !activitiesError && (
          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-neutral-900 border-collapse border border-neutral-700 select-none">
              <thead className="sticky top-0">
                <tr className="bg-neutral-100 text-neutral-900">
                  <th className="pl-2 text-start cursor-pointer">Id</th>
                  <th className="pl-2 text-start cursor-pointer">Atividade</th>
                  <th className="pl-2 text-start cursor-pointer">Operação</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                    onClick={() => handleRowClick({
                      id: activity.id,
                      name: activity.name,
                      operation: activity.operation,
                      expressions: []
                    })}>
                      <td className="p-2">{activity.id}</td>
                      <td className="p-2">{activity.name}</td>
                      <td className="p-2">{activity.operation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ActivityModal id={selectedActivityId} open={isActivityModalOpen} onClose={handleCloseModal} onSave={handleSave} />
    </>
  );
}

export { Activities };