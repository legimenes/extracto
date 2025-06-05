import { useCallback, useState } from 'react'
import axios from 'axios';
import { BankStatementEntry, BankStatementLoader } from '@/components/bank-statements';
import { ActivityResponse } from '@shared/contracts/activities/ActivityResponse';
import { MonthlyActivity } from '@/models/MonthlyActivity';

const BankStatements = () => {
  const [data, setData] = useState<BankStatementEntry[]>([]);
  const [activities, setActivities] = useState<ActivityResponse[]>([]);

  const handleFileSelect = (bankStatementEntries: BankStatementEntry[], loadedActivities: ActivityResponse[]) => {
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

  // testando este metodo
  const handleActivityChange = (id: number, activityId: number) => {
    setData(data.map(entry =>
      entry.id === id ? { ...entry, activities: [{ id: activityId, name: activities.find(a => a.id === activityId)?.name || '' }]} : entry
    ));
  };

  const handleExport = async () => {
    const selectedEntries: BankStatementEntry[] = data.filter((entry) => entry.selected);
    console.log(selectedEntries);
    return;
    const monthlyActivities: MonthlyActivity[] = [];
    selectedEntries.forEach(entry => {
      monthlyActivities.push({
        activityId: entry.activities[0].id,
        activityName: entry.activities[0].name,
        statementEntry: entry.memo,
        date: entry.date,
        value: entry.value
      });
    });
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}reports/monthly-statement`, JSON.stringify(monthlyActivities, null, 2), {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.status === 200) {
      alert("Successfully exported");
    }
    else {
      alert("Error exporting");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-none w-10 bg-neutral-900">01</div>
        <div className="flex-1 py-4 px-20 overflow-y-auto bg-neutral-800">
          <h1 className="border-b border-gray-200 mb-6 font-bold text-2xl">Extrato</h1>
          <BankStatementLoader onFileSelect={handleFileSelect} />
            <div className="mx-auto">
              <div className="overflow-auto max-h-96">
                <table className="min-w-full bg-neutral-900 border-collapse border border-neutral-700">
                  <thead className="sticky top-0">
                    <tr className="bg-neutral-900 text-neutral-400">
                      <th className="pl-2 text-start cursor-pointer"></th>
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
              <button
                className="mt-3 px-3 py-1 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700"
                onClick={handleExport}>
                Exportar
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export { BankStatements }