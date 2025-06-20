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
        const tmpGroupFields = [...groupFields];

        while (i + 1 < fields.length) {
          i++;
          const [nextTagRaw, ...nextValueParts] = fields[i].split("=");
          const nextTag = nextTagRaw;
          const nextValue = nextValueParts.join("=");

          // Check if the next tag is part of the group
          if (tmpGroupFields.includes(nextTag)) {
            tmpGroupFields.splice(tmpGroupFields.indexOf(nextTag), 1); // Remove tag from the list
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
          } else {
            i--;  // If the tag is not part of the group, we stop processing this group
            break;
          }
        }
        children.push(groupItem);
      }
      console.log("Group Fields:", children);

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
