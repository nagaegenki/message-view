export function parseFixMessage(message, delimiter, selectedDefs, tagDefsAll, groupTagDefs) {
  const fields = message.split(delimiter).filter(Boolean);

  // To switch different tag definitions based on user selection
  const switchTagDefs = () => {
    switch (selectedDefs) {
      case "customDef":
        return tagDefsAll.customDef;
      case "defaultDef":
      default:
        return tagDefsAll.defaultDef;
    }
  };
  const tagDefs = switchTagDefs();

  let i = 0;
  const result = [];

  const parseGroupChildren = (expectedFields, groupCount) => {
    const children = [];

    for (let g = 0; g < groupCount; g++) {
      const groupItem = [];
      const tmpFields = [...expectedFields];

      while (i + 1 < fields.length) {
        i++;
        const [rawTag, ...valueParts] = fields[i].split("=");
        const tag = rawTag;
        const value = valueParts.join("=");
        const def = tagDefs[tag] || { name: "Unknown", description: "No description" };

        if (!tmpFields.includes(tag)) {
          i--;  // If the tag is not part of the group, we stop processing this group
          break;
        }

        tmpFields.splice(tmpFields.indexOf(tag), 1); // Remove tag from the list

        if (def.group && groupTagDefs[tag]) {
          const nestedGroupCount = parseInt(value, 10);
          const nestedFields = groupTagDefs[tag].fields || [];
          const nestedChildren = parseGroupChildren(nestedFields, nestedGroupCount);

          groupItem.push({
            tag,
            name: def.name || "",
            description: def.description || "",
            value,
            type: def.type || "",
            children: nestedChildren,
            group: true,
            repeating: true
          });
        } else {
          groupItem.push({
            tag,
            name: def.name || "",
            description: def.description || "",
            value,
            type: def.type || "",
            enumLabel: def.enum?.[value] || "",
            repeating: true
          });
        }
      }
      children.push(groupItem);
    }

    return children;
  };

  while (i < fields.length) {
    const [rawTag, ...rawValueParts] = fields[i].split("=");
    const tag = rawTag;
    const value = rawValueParts.join("=");
    const def = tagDefs[tag] || { name: "Unknown", description: "No description" };

    if (def.group && groupTagDefs[tag]) {
      // Process repeating group
      const groupCount = parseInt(value, 10);
      const groupFields = groupTagDefs[tag]?.fields || [];
      const children = parseGroupChildren(groupFields, groupCount);

      // Add group field to the result
      result.push({
        tag,
        name: def.name || "",
        description: def.description || "",
        value,
        type: def.type || "",
        children,
        group: true
      });
    } else {
      // Process normal tag
      result.push({
        tag,
        name: def.name || "",
        description: def.description || "",
        value,
        type: def.type || "",
        enumLabel: def.enum?.[value] || ""
      });
    }

    i++;
  }

  return result;
}
