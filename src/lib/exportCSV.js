export function exportCSV(data, filename) {
  if (!Array.isArray(data) || data.length === 0) {
    alert("No data to export.");
    return;
  }

  const header = ["Tag", "Name", "Value", "Description"];
  const rows = [];

  const flattenRows = (fields, depth = 0) => {
    fields.forEach(field => {
      if (field.group && Array.isArray(field.children)) {
        rows.push([
          field.tag,
          field.name,
          field.value,
          `[Group] ${field.description}`
        ]);

        field.children.forEach(groupItem => {
          flattenRows(groupItem, depth + 1);
        });
      } else {
        rows.push([
          field.tag,
          field.name,
          field.value,
          field.description
        ]);
      }
    });
  };

  flattenRows(data);

  const csvContent = [header, ...rows]
    .map(row =>
      row.map(col => `"${String(col).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
