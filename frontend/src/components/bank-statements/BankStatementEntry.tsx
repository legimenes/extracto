import { memo } from 'react';
import { useCurrency, useDate } from '../../hooks';
import { AccountStatement } from '../../models';

interface BankStatementEntryProps {
  entry: AccountStatement,
  onToggleEntry: (id: number) => void
}

const BankStatementEntry = memo(({entry, onToggleEntry}: BankStatementEntryProps) => {
  const { formatCurrency } = useCurrency();
  const { formatDate } = useDate();

  return (
    <>
      <tr className="border border-neutral-700 hover:bg-neutral-800 cursor-pointer">
        <td className="p-2">
          <input
            id={`entry${entry.id}`}
            type="checkbox"
            className="accent-lime-600 cursor-pointer"
            checked={entry.selected}
            onChange={() => onToggleEntry(entry.id)}
          />
        </td>
        <td className="p-2">
          <select
            id={`activity${entry.id}`}
            className="border border-neutral-400 rounded text-white bg-neutral-800 cursor-pointer"
            defaultValue={entry.id}
            >
            {entry.activities.map((activity, index) => (
              <option key={index} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </td>
        <td className="p-2">{entry.statementEntry}</td>
        <td className="p-2">{formatDate(entry.date, "dd/MM/yyyy")}</td>
        <td className="p-2 min-w-36">{formatCurrency(entry.value)}</td>
      </tr>
    </>
  )
});

export { BankStatementEntry }