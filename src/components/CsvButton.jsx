import clsx from "clsx";
import { exportCSV } from '../lib/exportCSV';

const CsvButton = ({
    bgColor = "bg-indigo-700",
    hoverColor = "bg-indigo-900",
    selectedDefs,
    parsedData
}) => {
  return (
    <button
      onClick={() => {
                  const now = new Date();
                  const ymd = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
                  const hms = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
                  const filename = `fixData_with_${selectedDefs}_${ymd}-${hms}.csv`;
                  exportCSV(parsedData, filename);
                }}
      className={clsx(
        "px-4 py-1 text-white rounded",
        bgColor,
        `hover:${hoverColor}`
      )}
    >
      CSV
    </button>
  );
};

export default CsvButton;
