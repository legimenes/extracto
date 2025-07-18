import { useState } from 'react';
import ActivityGateway from '@gateways/ActivityGateway';
import { ActivityResponse as ActivityItemResponse } from '@shared/contracts/activities/ActivityResponse';
import { ActivityResponse } from '@shared/contracts/activity/ActivityResponse';
import { InsertActivityRequest } from '@shared/contracts/insert-activity/InsertActivityRequest';
import { UpdateActivityRequest } from '@shared/contracts/update-activity/UpdateActivityRequest';

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityItemResponse[]>([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);

  const getActivities = async (): Promise<ActivityItemResponse[]> => {
    setActivitiesError(null);
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
    setActivitiesError(null);
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

  const insertActivity = async (activity: InsertActivityRequest): Promise<void> => {
    setActivitiesError(null);
    setIsActivitiesLoading(true);
    try {
      await ActivityGateway.insertActivity(activity);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to insert activity';
      setActivitiesError(message);
      throw error;
    } finally {
      setIsActivitiesLoading(false);
    }
  };

  const updateActivity = async (id: number, activity: UpdateActivityRequest): Promise<void> => {
    setActivitiesError(null);
    setIsActivitiesLoading(true);
    try {
      await ActivityGateway.updateActivity(id, activity);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update activity';
      setActivitiesError(message);
      throw error;
    } finally {
      setIsActivitiesLoading(false);
    }
  };

  const deleteActivity = async (id: number): Promise<void> => {
    setActivitiesError(null);
    setIsActivitiesLoading(true);
    try {
      await ActivityGateway.deleteActivity(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete activity';
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
    insertActivity,
    updateActivity,
    deleteActivity,
    isActivitiesLoading,
    activitiesError
  };
};

export default useActivities;