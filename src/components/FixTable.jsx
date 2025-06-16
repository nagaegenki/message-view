import React from 'react';

const FixTable = ({ data = [] }) => {
  const renderRow = (field, index, depth = 0, parentKey = '', groupIndex = null) => {
    const key = `${parentKey}-${field.tag}-${index}`;
    const valueDisplay = field.enumLabel 
      ? `${field.value} (${field.enumLabel})` 
      : field.value;

    const repeatBgClass = 
      groupIndex !== null && groupIndex % 2 === 0
      ? "bg-indigo-50"
      : "bg-white";

    
    // Create a table row for group fields
    if (field.group) {
      return (
        <React.Fragment key={key}>
          <tr className="bg-indigo-300 border-1-4">
            <td className="border p-2 font-semibold">
              {field.tag}
            </td>
            <td className="border p-2 font-semibold">{field.name}</td>
            <td className="border p-2">{valueDisplay}</td>
            <td className="border p-2 text-sm text-gray-600">[Group] {field.description}</td>
          </tr>
          {field.children.map((groupItem, groupIndex) => 
            groupItem.map((childField, childIndex) => 
              renderRow(childField, `${index}-${groupItem}-${childIndex}`, depth + 1, key, groupIndex)
            )
          )}
        </React.Fragment>
      );
    }

    // Create a table row for normal fields
    return (
      <tr 
        key={key} 
        className={`
          ${repeatBgClass} 
          ${field.repeating ? "bg-yellow-50" : ""} 
          ${field.name === "Unknown" ? "text-red-500": ""}
        `}
      >
        <td className="border p-2">{field.tag}</td>
        <td className="border p-2">{field.name}</td>
        <td className="border p-2">{valueDisplay}</td>
        <td 
          className={`
            border p-2 text-sm
            ${field.name === "Unknown" ? "text-red-500" : "text-gray-600"}
          `}
        >
          {field.description}
        </td>
      </tr>
    );
  };

  return (
    <table className="fix-table border mt-4 w-full border-collapse">
      <thead className="bg-gray-300">
        <tr>
          <th className="border p-2">Tag</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Value</th>
          <th className="border p-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((field, index) => renderRow(field, index))}
      </tbody>
    </table>
  );
};

export default FixTable;
