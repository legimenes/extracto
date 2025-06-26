import { useState } from 'react';
import ActivityGateway from '@gateways/ActivityGateway';
import { ActivityResponse as ActivityItemResponse } from '@shared/contracts/activities/ActivityResponse';
import { ActivityResponse } from '@shared/contracts/activity/ActivityResponse';

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityItemResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getActivities = async (): Promise<ActivityItemResponse[]> => {
    setLoading(true);
    try {
      const data: ActivityItemResponse[] = await ActivityGateway.getActivities();
      setActivities(data);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load activities';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getActivity = async (id: number): Promise<ActivityResponse | undefined> => {
    setLoading(true);
    try {
      const data: ActivityResponse | undefined = await ActivityGateway.getActivity(id);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load activity';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    activities,
    getActivities,
    getActivity,
    loading,
    error
  };
};

export default useActivities;