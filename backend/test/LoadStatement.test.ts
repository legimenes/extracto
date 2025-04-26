import dotenv from 'dotenv';
import * as path from 'path';
import fs from 'fs';
import { LoadBankStatementResponse } from '@shared/contracts/load-bank-statement/LoadBankStatementResponse';
import IStatementDao from '@application/IStatementDao';
import { LoadBankStatement } from '@application/LoadBankStatement';
import StatementDao from '@infrastructure/data/StatementDao';

let statementDao: IStatementDao;
let loadBankStatement: LoadBankStatement;
let fileDir: string | undefined;

beforeEach(() => {
  jest.setTimeout(Infinity);
  statementDao = new StatementDao();
  loadBankStatement = new LoadBankStatement(statementDao);
  dotenv.config();
  fileDir = process.env.FILES_DIR;
});

test('Deve identificar uma atividade financeira no lançamento no extrato', async () => {
  const filePath = path.join(fileDir!, "upload", "extratoSantander.ofx");
  const ofxFile: string = fs.readFileSync(filePath, 'utf8');
  const loadBankStatementResponse: LoadBankStatementResponse = await loadBankStatement.execute(ofxFile);
  
  expect(loadBankStatementResponse.entries.every(p => p.activities !== undefined)).toBeTruthy();
});