import { Router, Request, Response } from 'express';
import memoryUpload from '@infrastructure/middlewares/memoryUpload';
import StatementDao from '@infrastructure/data/StatementDao';
import { ActivityResponse, LoadBankStatementResponse } from '@shared/contracts/load-bank-statement/LoadBankStatementResponse';
import { LoadBankStatement } from '@application/LoadBankStatement';
import { GetActivities } from '@application/GetActivities';
import GenerateMonthlyBankStatementReport from '@application/GenerateMonthlyBankStatementReport';
import { MonthlyBankStatementRequest } from '@shared/contracts/monthly-bank-statement-report/MonthlyBankStatementRequest';

const router = Router();
const statementDao: StatementDao = new StatementDao();
const getActivities: GetActivities = new GetActivities(statementDao);
const loadBankStatement: LoadBankStatement = new LoadBankStatement(statementDao);
const generateMonthlyBankStatementReport: GenerateMonthlyBankStatementReport = new GenerateMonthlyBankStatementReport();

router.get('/activities', async (req: Request, res: Response) => {
  const activitiesResponse: ActivityResponse[] = await getActivities.execute();
  res.send(activitiesResponse);
});

router.post('/load-bank-statement', memoryUpload, async (req: Request, res: Response) => {
  const fileBuffer: Buffer | undefined = req.file?.buffer;
  const loadBankStatementResponse: LoadBankStatementResponse = await loadBankStatement.execute(fileBuffer?.toString('utf-8'));
  res.send(loadBankStatementResponse);
});

router.post('/reports/monthly-bank-statement', async (req: Request, res: Response) => {
  const input: MonthlyBankStatementRequest[] = req.body;
  await generateMonthlyBankStatementReport.execute(input);
  res.send();
});

export default router;