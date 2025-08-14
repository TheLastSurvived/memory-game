import type { Records } from "../../types";

interface RecordsListProps {
  records: Records[];
}

export default function RecordsList({ records }: RecordsListProps) {
  return (
    <div>
      <p>Топ 10 рекордов</p>
      <ul className="list-group">
        {records.map((record, index) => (
          <li key={record.id} className="list-group-item">
            {index + 1}. {record.name} - {record.moves} ходов
          </li>
        ))}
      </ul>
    </div>
  );
}