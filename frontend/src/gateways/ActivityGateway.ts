import axios from "axios";
import { ActivityResponse as ActivityItemResponse } from '@shared/contracts/activities/ActivityResponse';
import { ActivityResponse  } from '@shared/contracts/activity/ActivityResponse';

export interface IActivityGateway {
	getActivities(): Promise<ActivityItemResponse[]>;
  getActivity(id: number): Promise<ActivityResponse | undefined>
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
  }

}

export default ActivityGateway;