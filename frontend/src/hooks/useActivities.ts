import { useState } from 'react';
import ActivityGateway from '@gateways/ActivityGateway';
import { ActivityResponse } from '@shared/contracts/activities/ActivityResponse';

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getActivities = async (): Promise<ActivityResponse[]> => {
    setLoading(true);
    try {
      const data: ActivityResponse[] = await ActivityGateway.getActivities();
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

  return {
    activities,
    getActivities,
    loading,
    error
  };
};

export default useActivities;