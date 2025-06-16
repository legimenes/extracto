import axios from "axios";
import { MonthlyBankStatementRequest } from "@shared/contracts/monthly-bank-statement-report/MonthlyBankStatementRequest";

export interface IReportGateway {
	generateMonthlyBankStatement(request: MonthlyBankStatementRequest[]): Promise<void>;
}

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}reports/` ;

const ReportGateway: IReportGateway = {

  generateMonthlyBankStatement: async (request: MonthlyBankStatementRequest[]) => {
    try {
      const url = `${BASE_URL}monthly-bank-statement`;
      await axios.post(url, request);
    } catch (error) {
      console.error('Error fetching report:', error);
      throw new Error('Failed to fetch report');
    }
  }

}

export default ReportGateway;