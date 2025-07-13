import React from 'react';

export default function CaseSelector({ messages, selectedIndex, onSelect }) {
  return (
    <div className="mb-4">
      <label className="text-indigo-900 font-semibold mr-2">Select Case:</label>
      <select 
        value={selectedIndex !== null ? selectedIndex : ""}
        onChange={(e) => {
          const val = e.target.value;
          onSelect(val === "" ? null : parseInt(val));
        }}
        className="border rounded px-2 py-1"
      >
        <option value="">------</option>
        {messages.map((_, idx) => (
          <option key={idx} value={idx}>Case {idx + 1}</option>
        ))}
      </select>
    </div>
  );
}
