import defaultDef from './tagDefaultDefs.json';
import customDef from './tagCustomDefs.json';
import groupTagDefs from './groupTagDefs.json';

export function parseFixMessage(message, delimiter, selectedDefs) {
  const fields = message.split(delimiter).filter(Boolean);

  // To switch between different tag definitions based on user selection
  const switchTagDefs = () => {
    switch (selectedDefs) {
      case "defaultDef":
        return defaultDef;
      case "customDef":
        return customDef;
      default:
        return defaultDef;  // Fallback to default if no valid option is selected
    }
  }
  const tagDefs = switchTagDefs();
  const result = [];

  let i = 0;

  while (i < fields.length) {
    const [rawTag, ...rawValueParts] = fields[i].split("=");
    const tag = rawTag;
    const value = rawValueParts.join("=");
    const def = tagDefs[tag] || { name: "Unknown", description: "No description" };
    const isGroup = def.group || false;

    if (isGroup) {
      // Process repeating group
      const groupCount = parseInt(value, 10);
      const groupFields = groupTagDefs[tag]?.fields || [];
      const children = [];

      for (let g = 0; g < groupCount; g++) {
        const groupItem = [];
        let j = 0;

        while (j < groupFields.length) {
          i++;

          const [nextTagRaw, ...nextValueParts] = fields[i].split("=");
          const nextTag = nextTagRaw;
          const nextValue = nextValueParts.join("=");
          
          const childDef = tagDefs[nextTag] || {};
          groupItem.push({
            tag: nextTag,
            name: childDef.name || "Unknown",
            description: childDef.description || "No description",
            type: childDef.type || "",
            value: nextValue,
            enumLabel: childDef.enum?.[nextValue] || "",
            repeating: true
          });

          if (groupFields.includes(nextTag)) {
            j++;
          }
        }
        children.push(groupItem);
      }

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
