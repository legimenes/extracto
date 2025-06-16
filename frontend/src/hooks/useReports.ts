import ReportGateway from "@/gateways/ReportGateway";
import { MonthlyBankStatementRequest } from "@shared/contracts/monthly-bank-statement-report/MonthlyBankStatementRequest";

const useReports = () => {

  const generateMonthlyBankStatement = async (request: MonthlyBankStatementRequest[]): Promise<void> => {
    await ReportGateway.generateMonthlyBankStatement(request);
  };

  return {
    generateMonthlyBankStatement
  };
};

export default useReports;