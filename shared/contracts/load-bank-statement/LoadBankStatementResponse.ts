interface LoadBankStatementResponse {
  entries: EntryResponse[];
};

interface EntryResponse {
  id: number;
  activities: ActivityResponse[];
  memo: string;
  date: Date;
  value: number;
}

interface ActivityResponse {
  id: number;
  name: string;
};

export { 
  LoadBankStatementResponse,
  EntryResponse,
  ActivityResponse
};