import React from 'react';

const FixTable = ({ data = [] }) => {
  const getDepthBgClass = (depth) => {
    const bgMap = {
      0: "bg-white",
      1: "bg-indigo-200",
      2: "bg-sky-200",
      3: "bg-lime-200",
      4: "bg-yellow-200",
    };
    return bgMap[depth] || "bg-indigo-400";
  };

  const renderRow = (field, index, depth = 0, parentKey = '', groupIndex = null) => {
    const key = `${parentKey}-${field.tag}-${index}`;
    const valueDisplay = field.enumLabel
      ? `${field.value} (${field.enumLabel})`
      : field.value;

    const bgColor = getDepthBgClass(depth);
    const repeatStripe = groupIndex !== null && groupIndex % 2 === 0 ? "bg-opacity-60" : "bg-opacity-20";
    
    // Create a table row for group fields
    if (field.group) {
      return (
        <React.Fragment key={key}>
          <tr className={`${getDepthBgClass(depth)} border`}>
            <td className="border p-2 font-semibold">
              {field.tag}
            </td>
            <td className="border p-2 font-semibold">{field.name}</td>
            <td className="border p-2">{valueDisplay}</td>
            <td className="border p-2 text-sm text-gray-600">
              <span className="text-indigo-700 font-medium">[Group]</span>  {field.description}
            </td>
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
          ${bgColor} ${field.repeating ? repeatStripe : ""}
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
    <table className="fix-table border mt-4 w-full border-collapse text-sm">
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
