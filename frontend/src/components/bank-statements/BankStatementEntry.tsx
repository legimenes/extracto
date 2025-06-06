import { memo } from 'react';
import { useCurrency, useDate } from '@/hooks';
import { ActivityResponse } from '@shared/contracts/activities/ActivityResponse';
import { Entry } from '@/models/Entry';

interface BankStatementEntryProps {
  entry: Entry;
  activities: ActivityResponse[];
  onToggleEntry: (id: number) => void;
  onActivityChange: (id: number, activityId: number) => void;
}

const BankStatementEntry = memo(({entry, activities, onToggleEntry: onToggleEntry, onActivityChange: onActivityChange}: BankStatementEntryProps) => {
  const { formatCurrency } = useCurrency();
  const { formatDate } = useDate();

  const activitiesByOperation = activities?.filter(activity =>
    entry.value < 0 ? activity.operation === 'D' : activity.operation === 'C'
  );

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
            id={`activityEntry${entry.id}`}
            className="border border-neutral-400 rounded text-white bg-neutral-800 cursor-pointer"
            defaultValue={entry.activities[0].id}
            onChange={e => onActivityChange(entry.id, Number(e.target.value))}>
            {activitiesByOperation.map(activity => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </td>
        <td className="p-2">{entry.memo}</td>
        <td className="p-2">{formatDate(entry.date, "dd/MM/yyyy")}</td>
        <td className="p-2 min-w-36">{formatCurrency(entry.value)}</td>
      </tr>
    </>
  )
});

export { BankStatementEntry }