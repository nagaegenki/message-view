import tagDefs from './tagDefs.json';
import groupTagDefs from './groupTagDefs.json';

const SOH = '\u0001';

export function parseFixMessage(message) {
  const fields = message.split(SOH).filter(Boolean);
  const result = [];

  let i = 0;

  while (i < fields.length) {
    const [rawTag, ...rawValueParts] = fields[i].split('=');
    const tag = rawTag;
    const value = rawValueParts.join('=');
    const def = tagDefs[tag] || { name: `Unknown`, description: 'No description' };
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

          const [nextTagRaw, ...nextValueParts] = fields[i].split('=');
          const nextTag = nextTagRaw;
          const nextValue = nextValueParts.join('=');
          
          const childDef = tagDefs[nextTag] || {};
          groupItem.push({
            tag: nextTag,
            name: childDef.name || 'Unknown',
            description: childDef.description || 'No description',
            type: childDef.type || '',
            value: nextValue,
            enumLabel: childDef.enum?.[nextValue] || '',
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
        name: def.name || '',
        description: def.description || '',
        value,
        type: def.type || '',
        children,
        group: true
      });
    } else {
      // Process normal tag
      result.push({
        tag,
        name: def.name || '',
        description: def.description || '',
        value,
        type: def.type || '',
        enumLabel: def.enum?.[value] || ''
      });
    }

    i++;
  }

  return result;
}
