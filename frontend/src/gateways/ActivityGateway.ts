import axios from "axios";
import { ActivityResponse } from '@shared/contracts/activities/ActivityResponse';

export interface IActivityGateway {
	getActivities (): Promise<ActivityResponse[]>;
}

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}activities`;

const ActivityGateway: IActivityGateway = {

  getActivities: async (): Promise<ActivityResponse[]> => {
    try {
      const response = await axios.get<ActivityResponse[]>(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch activities');
    }
  }
  
}

export default ActivityGateway;