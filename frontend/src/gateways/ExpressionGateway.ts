import axios from "axios";
import { InsertExpressionRequest } from '@shared/contracts/insert-expression/InsertExpressionRequest';

export interface IExpressionGateway {
  insertExpression(expression: InsertExpressionRequest): Promise<void>;
  deleteExpression(id: number): Promise<void>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ExpressionGateway: IExpressionGateway = {

  insertExpression: async (expression: InsertExpressionRequest): Promise<void> => {
    try {
      const url = `${BASE_URL}expression`;
      await axios.post(url, expression);
    } catch (error) {
      console.error('Error inserting expression:', error);
      throw new Error('Failed to insert expression');
    }
  },

  deleteExpression: async (id: number): Promise<void> => {
    try {
      const url = `${BASE_URL}expression/${id}`;
      await axios.delete(url);
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw new Error('Failed to delete activity');
    }
  }

}

export default ExpressionGateway;