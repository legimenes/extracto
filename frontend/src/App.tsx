import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import StatementLoader from './components/statement-loader';

interface Activity {
  id: number;
  name: string;
}

interface Statement {
  selected: boolean,
  id: number;
  activities: Activity[];
  statementEntry: string;
  date: Date;
  value: number;
}

interface MonthlyActivity {
  activityId: number;
  activityName: string;
  statementEntry: string;
  date: Date;
  value: number;
};

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
    const response = await axios.post("http://localhost:3000/reports/monthly-statement", JSON.stringify(monthlyActivities, null, 2), {
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

  const formatCurrency = (amount: number, currency = 'BRL', locale = 'pt-BR') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  console.log('RENDER');

  return (
    <>
      <div className="w-screen h-screen overflow-y-auto bg-slate-700 p-4">
        <h1>Extrato</h1>
        <StatementLoader onFileSelect={handleFileSelect} />
        <div className="max-w-4xl mx-auto">
          <table className="min-w-full bg-slate-300 border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th></th>
                <th>Atividade</th>
                <th>Lançamento</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border border-slate-200 hover:bg-slate-200 cursor-pointer">
                  <td className="border-r p-1">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleEntry(item.id)}
                    />
                  </td>
                  <td className="border-r p-1">
                    <select
                      className=" border rounded"
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
                  <td className="border-r p-1">{item.statementEntry}</td>
                  <td className="border-r p-1">{format(item.date, "dd/MM/yyyy")}</td>
                  <td className="border-r p-1">{formatCurrency(item.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="px-3 py-1 mt-3 bg-slate-500 text-white rounded"
            onClick={handleExport}
          >
              Exportar
            </button>
        </div>
      </div>
    </>
  )
}

export default App