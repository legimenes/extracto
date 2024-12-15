import { Router, Request, Response } from 'express';
import memoryUpload from '../middlewares/memoryUpload';
import StatementDao from '../data/StatementDao';
import { LoadStatement, Output as StatementOutput } from '../../application/LoadStatement';
import { GenerateMonthlyStatementReport, Input as MonthlyStatementReportInput } from '../../application/GenerateMonthlyStatementReport';

const router = Router();
const statementDao: StatementDao = new StatementDao();
const loadStatement: LoadStatement = new LoadStatement(statementDao);
const generateMonthlyStatementReport: GenerateMonthlyStatementReport = new GenerateMonthlyStatementReport();

router.post('/load-statement', memoryUpload, async (req: Request, res: Response) => {
  const fileBuffer: Buffer | undefined = req.file?.buffer;
  const accountStatement: StatementOutput[] = await loadStatement.execute(fileBuffer?.toString('utf-8'));
  res.send(accountStatement);
});

router.post('/reports/monthly-statement', async (req: Request, res: Response) => {
  const input: MonthlyStatementReportInput[] = req.body;
  await generateMonthlyStatementReport.execute(input);
  res.send();
});

export default router;