import { useCallback, useState } from 'react'
import useReports from '@/hooks/useReports';
import { BankStatementEntry, BankStatementLoader } from '@/components/bank-statements';
import { ActivityResponse } from '@shared/contracts/activities/ActivityResponse';
import { MonthlyBankStatementRequest } from '@shared/contracts/monthly-bank-statement-report/MonthlyBankStatementRequest';
import { Entry } from '@/models';

const BankStatements = () => {
  const [data, setData] = useState<Entry[]>([]);
  const [activities, setActivities] = useState<ActivityResponse[]>([]);
  const { generateMonthlyBankStatement } = useReports();

  const handleFileSelect = (bankStatementEntries: Entry[], loadedActivities: ActivityResponse[]) => {
    setData(bankStatementEntries);
    setActivities(loadedActivities);
  };

  const handleToggleEntry = useCallback((id: number) => {
    setData((prevData) =>
      prevData.map((entry) =>
        entry.id === id
          ? { ...entry, selected: !entry.selected }
          : entry
      )
    );
  }, []);

  const handleToggleAllEntries = useCallback(() => {
    setData((prevData) => {
      const allSelected = prevData.every((entry) => entry.selected);
      return prevData.map((entry) => ({
        ...entry,
        selected: !allSelected,
      }));
    });
  }, []);

  const handleActivityChange = (id: number, activityId: number) => {
    setData(data.map(entry =>
      entry.id === id ? { ...entry, activities: [{ id: activityId, name: activities.find(a => a.id === activityId)?.name || '' }]} : entry
    ));
  };

  const handleExport = async () => {
    const selectedEntries: Entry[] = data.filter((entry) => entry.selected);
    const monthlyBankStatement: MonthlyBankStatementRequest[] = [];
    selectedEntries.forEach(entry => {
      monthlyBankStatement.push({
        activityId: entry.activities[0].id,
        activityName: entry.activities[0].name,
        statementEntry: entry.memo,
        date: entry.date,
        value: entry.value
      });
    });
    await generateMonthlyBankStatement(monthlyBankStatement);
    alert('Reports generated successfully');
  };

  const selectedEntries = data.filter((entry) => entry.selected).length;
  const totalEntries = data.length;

  return (
    <>
      <h1 className="border-b border-gray-200 mb-6 font-bold text-2xl">Extrato</h1>
      <BankStatementLoader onFileSelect={handleFileSelect} />
      <div className="mx-auto">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full bg-neutral-900 border-collapse border border-neutral-700">
            <thead className="sticky top-0">
              <tr className="bg-neutral-900 text-neutral-400">
                <th className="pl-2 text-start cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-lime-600 cursor-pointer"
                    checked={data.length > 0 && data.every((entry) => entry.selected)}
                    onChange={handleToggleAllEntries}
                  />
                </th>
                <th className="pl-2 text-start cursor-pointer">Atividade</th>
                <th className="pl-2 text-start cursor-pointer">Lançamento</th>
                <th className="pl-2 text-start cursor-pointer">Data</th>
                <th className="pl-2 text-start cursor-pointer">Valor</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <BankStatementEntry
                  key={item.id}
                  entry={item}
                  activities={activities}
                  onToggleEntry={handleToggleEntry}
                  onActivityChange={handleActivityChange} />
              ))}                    
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-3">
          <button
            className={`mt-3 px-3 py-1 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700 ${selectedEntries === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={selectedEntries === 0}
            onClick={handleExport}>
            Exportar
          </button>
          <div className="mt-3 text-neutral-300">
            {selectedEntries} / {totalEntries}
          </div>
        </div>
      </div>
    </>
  )
}

export { BankStatements }