import { useState } from 'react';
import FixTable from '../components/FixTable';
import { exportCSV } from '../lib/exportCSV';
import { parseFixMessage } from '../parser/fixParser';

function App() {
  const [rawMessage, setRawMessage] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [delimiter, setDelimiter] = useState('\u0001'); // Default delimiter is SOH
  const [selectedDefs, setselectedDefs] = useState("");    // Placeholder for tag definitions

  const handleParse = () => {
    console.log("Delimiter:", delimiter);
    console.log("Selected Definitions:", selectedDefs);
    const parsed = parseFixMessage(rawMessage, delimiter, selectedDefs);
    setParsedData(parsed);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl text-indigo-900 font-bold mb-4">Visualize FIX Msg</h1>
      <textarea
        className="border p-2 w-full h-24"
        value={rawMessage}
        onChange={(e) => setRawMessage(e.target.value)}
        placeholder="Please paste your FIX message here."
      />
      {/* Delimiter and Tag Definition Selectors */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-indigo-900 font-bold">Delimiter: </span>
        <select
          className="mt-1 border p-1"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        >
          <option value="\u0001">SOH ( \x01 )</option>
          <option value=";">; ( semicolon )</option>
          <option value="|">| ( pipe )</option>
          <option value="^">^ ( hat )</option>
        </select>
        <span className="text-indigo-900 font-bold">Tag Definition: </span>
        <select
          className="mt-1 border p-1 ml-2"
          value={selectedDefs}
          onChange={(e) => setselectedDefs(e.target.value)}
        >
          <option value="defaultDef">Default_ver : EP298</option>
          <option value="customDef">Custom A</option>
        </select>
      </div>
      <div className="mt-2 flex gap-2">
        <button
          onClick={handleParse}
          className="px-4 py-1 bg-blue-700 text-white rounded hover:bg-blue-900"
        >
          Visualize
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-1 bg-green-700 text-white rounded hover:bg-green-900"
        >
          PDF
        </button>
        <button
          onClick={() => {
            const now = new Date();
            const ymd = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
            const hms = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
            const filename = `fixData_with_${selectedDefs}_${ymd}-${hms}.csv`;
            exportCSV(parsedData, filename);
          }}
          className="px-4 py-1 bg-blue-700 text-white rounded hover:bg-blue-900"
        >
          CSV
        </button>
      </div>

      {parsedData.length > 0 && (
        <div className="mt-4">
          <FixTable data={parsedData} />
        </div>
      )}
    </div>
  );
}

export default App;
