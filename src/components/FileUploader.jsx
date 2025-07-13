import React from 'react';

export default function FileUploader({ onMessagesParsed }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
      onMessagesParsed(lines);
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <label className="text-indigo-900 font-semibold mr-2">Upload FIX File:</label>
      <input type="file" accept=".*" onChange={handleFileUpload} />
    </div>
  );
}
