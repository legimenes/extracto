import * as path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import IStatementDao from "../src/application/IStatementDao";
import { LoadStatement, Output as StatementOutput } from "../src/application/LoadStatement";
import StatementDao from "../src/infrastructure/data/StatementDao";

let statementDao: IStatementDao;
let readStatement: LoadStatement;
let fileDir: string | undefined;

beforeEach(() => {
  jest.setTimeout(Infinity);
  statementDao = new StatementDao();
  readStatement = new LoadStatement(statementDao);

  dotenv.config();
  fileDir = process.env.FILES_DIR;
});

test('Deve identificar uma atividade financeira no lançamento no extrato', async () => {
  const filePath = path.join(fileDir!, "upload", "extratoSantander.ofx");
  const ofxFile: string = fs.readFileSync(filePath, 'utf8');
  const accountStatement: StatementOutput[] = await readStatement.execute(ofxFile);

  expect(accountStatement.every(p => p.activities !== undefined)).toBeTruthy();
});