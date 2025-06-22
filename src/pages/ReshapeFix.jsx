import { useState } from 'react';
import CsvButton from '../components/CsvButton';
import FixTable from '../components/FixTable';
import PdfButton from '../components/PdfButton';
import { parseFixMessage } from '../parser/fixParser';

function App() {
  const [rawMessage, setRawMessage] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [delimiter, setDelimiter] = useState('\u0001');           // Default delimiter is SOH
  const [selectedDefs, setselectedDefs] = useState("defaultDef"); // Placeholder for tag definitions

  const handleParse = () => {
    if (!rawMessage.trim()) {
      alert("Message is empty. Please paste it.");
      return;
    }

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
          className="mt-1 border p-1"
          value={selectedDefs}
          onChange={(e) => setselectedDefs(e.target.value)}
        >
          <option value="defaultDef">ver : EP298</option>
          <option value="customDef">Custom A</option>
        </select>
      </div>
      {/* Buttons for actions */}
      <div className="mt-2 flex gap-2">
        <button
          onClick={handleParse}
          className="px-4 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-900"
        >
          Visualize
        </button>
        <CsvButton bgColor="bg-green-700" hoverColor="bg-green-900" selectedDefs={selectedDefs} parsedData={parsedData} />
        <PdfButton />
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
