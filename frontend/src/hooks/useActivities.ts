import { useState } from 'react';
import ActivityGateway from '@gateways/ActivityGateway';
import { ActivityResponse as ActivityItemResponse } from '@shared/contracts/activities/ActivityResponse';
import { ActivityResponse } from '@shared/contracts/activity/ActivityResponse';

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityItemResponse[]>([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);

  const getActivities = async (): Promise<ActivityItemResponse[]> => {
    setIsActivitiesLoading(true);
    try {
      const data: ActivityItemResponse[] = await ActivityGateway.getActivities();
      setActivities(data);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load activities';
      setActivitiesError(message);
      throw error;
    } finally {
      setIsActivitiesLoading(false);
    }
  };

  const getActivity = async (id: number): Promise<ActivityResponse | undefined> => {
    setIsActivitiesLoading(true);
    try {
      const data: ActivityResponse | undefined = await ActivityGateway.getActivity(id);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load activity';
      setActivitiesError(message);
      throw error;
    } finally {
      setIsActivitiesLoading(false);
    }
  };

  return {
    activities,
    getActivities,
    getActivity,
    isActivitiesLoading,
    activitiesError
  };
};

export default useActivities;