import { useState, useMemo } from 'react';
import { colors } from './colors'; // Assuming the dataset is in a separate file

const ColorList = () => {
  const [copiedColor, setCopiedColor] = useState<string| null>(null);
  const [filter, setFilter] = useState('');

  // Memoize the filtered colors to avoid unnecessary recalculations
  const filteredColors = useMemo(() => {
    const colorData = colors().items;
    return colorData.filter(color =>
      color.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);
  const copyToClipboard = (colorName: string) => {
    navigator.clipboard.writeText(colorName).then(() => {
      setCopiedColor(colorName);
      setTimeout(() => setCopiedColor(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div id="color-list" style={{ display: 'grid', gap: '20px' }}>
      <input
        type="text"
        placeholder="Filter colors..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: '10px',
          boxSizing: 'border-box',
        }}
      />
      <div
        id="color-items-container"
        style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '10px'
      }}>
        {filteredColors.map(color => (
          <figure key={color.title}
            onClick={() => copyToClipboard(color.title)}
            style={{ margin: 0, textAlign: 'center', width: '100%' }}>
            <div
              style={{
                width: '100%',
                paddingBottom: '100%', // This creates a 1:1 aspect ratio
                backgroundColor: color.hex,
                border: '1px solid #ccc',
                position: 'relative'
              }}
            >
              {copiedColor === color.title && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Copied!
                </div>
              )}
            </div>
            <figcaption>{color.arg}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default ColorList;
