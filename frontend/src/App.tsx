import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import MonthlyActivity from "./models/MonthlyActivity";
import Statement from "./models/Statement";
import StatementLoader from './components/statement-loader';
import { Currency } from "./value-objects/Currency";

function App() {
  const [data, setData] = useState<Statement[]>([]);
  
  const handleFileSelect = async (statement: Statement[]) => {
    setData(statement);
  };

  const toggleEntry = (id: number) => {
    setData((prevData) =>
      prevData.map((statement) =>
        statement.id === id
          ? { ...statement, selected: !statement.selected }
          : statement
      )
    );
  };

  const handleExport = async () => {
    const selectedStatements: Statement[] = data.filter((statement) => statement.selected);
    const monthlyActivities: MonthlyActivity[] = [];
    selectedStatements.forEach(statement => {
      monthlyActivities.push({
        activityId: statement.activities[0].id,
        activityName: statement.activities[0].name,
        statementEntry: statement.statementEntry,
        date: statement.date,
        value: statement.value
      });
    });
    console.log(JSON.stringify(monthlyActivities, null, 2));
    const response = await axios.post(`${import.meta.env.BASE_URL}reports/monthly-statement`, JSON.stringify(monthlyActivities, null, 2), {
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

  console.log('RENDER');

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-none w-10 bg-neutral-900">01</div>
        <div className="flex-1 py-4 px-20 overflow-y-auto bg-neutral-800">
          <h1 className="border-b border-gray-200 mb-6 font-bold text-2xl">Extrato</h1>
          <StatementLoader onFileSelect={handleFileSelect} />
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
                    <tr key={item.id} className="border border-neutral-700 hover:bg-neutral-800 cursor-pointer">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          className="accent-lime-600 cursor-pointer"
                          checked={item.selected}
                          onChange={() => toggleEntry(item.id)}
                        />
                      </td>
                      <td className="p-2">
                        <select
                          className="border border-neutral-400 rounded text-white bg-neutral-800 cursor-pointer"
                          value={item.activities[0].id}
                          onChange={(e) => {
                            console.log('Novo valor selecionado:', e.target.value);
                          }}
                        >
                          {item.activities.map((activity, index) => (
                            <option key={index} value={activity.id}>
                              {activity.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">{item.statementEntry}</td>
                      <td className="p-2">{format(item.date, "dd/MM/yyyy")}</td>
                      <td className="p-2 min-w-36">{Currency.format(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-3 px-3 py-1 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700"
              onClick={handleExport}
            >
              Exportar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App