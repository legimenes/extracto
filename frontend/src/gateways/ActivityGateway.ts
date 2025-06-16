import axios from "axios";
import { ActivityResponse } from '@shared/contracts/activities/ActivityResponse';

export interface IActivityGateway {
	getActivities (): Promise<ActivityResponse[]>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ActivityGateway: IActivityGateway = {

  getActivities: async (): Promise<ActivityResponse[]> => {
    try {
      const url = `${BASE_URL}activities`;
      const response = await axios.get<ActivityResponse[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch activities');
    }
  }
  
}

export default ActivityGateway;