import axios from "axios";
import { ActivityResponse as ActivityItemResponse } from '@shared/contracts/activities/ActivityResponse';
import { ActivityResponse  } from '@shared/contracts/activity/ActivityResponse';
import { InsertActivityRequest } from '@shared/contracts/insert-activity/InsertActivityRequest';
import { UpdateActivityRequest } from '@shared/contracts/update-activity/UpdateActivityRequest';

export interface IActivityGateway {
	getActivities(): Promise<ActivityItemResponse[]>;
  getActivity(id: number): Promise<ActivityResponse | undefined>;
  insertActivity(activity: InsertActivityRequest): Promise<void>;
  updateActivity(id: number,activity: UpdateActivityRequest): Promise<void>;
  deleteActivity(id: number): Promise<void>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ActivityGateway: IActivityGateway = {

  getActivities: async (): Promise<ActivityItemResponse[]> => {
    try {
      const url = `${BASE_URL}activities`;
      const response = await axios.get<ActivityItemResponse[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch activities');
    }
  },

  getActivity: async (id: number): Promise<ActivityResponse | undefined> => {
    try {
      const url = `${BASE_URL}activity/${id}`;
      const response = await axios.get<ActivityResponse>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching activity:', error);
      throw new Error('Failed to fetch activity');
    }
  },

  insertActivity: async (activity: InsertActivityRequest): Promise<void> => {
    try {
      const url = `${BASE_URL}activity`;
      await axios.post(url, activity);
    } catch (error) {
      console.error('Error inserting activity:', error);
      throw new Error('Failed to insert activity');
    }
  },

  updateActivity: async (id: number, activity: UpdateActivityRequest): Promise<void> => {
    try {
      const url = `${BASE_URL}activity/${id}`;
      await axios.put(url, activity);
    } catch (error) {
      console.error('Error updating activity:', error);
      throw new Error('Failed to update activity');
    }
  },

  deleteActivity: async (id: number): Promise<void> => {
    try {
      const url = `${BASE_URL}activity/${id}`;
      await axios.delete(url);
    } catch (error) {
      console.error('Error updating activity:', error);
      throw new Error('Failed to update activity');
    }
  }

}

export default ActivityGateway;