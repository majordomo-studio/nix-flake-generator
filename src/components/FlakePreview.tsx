import React from 'react';

interface FlakePreviewProps {
  flakeContent: string;
}

const FlakePreview: React.FC<FlakePreviewProps> = ({ flakeContent }) => {
  return (
    <pre
      className="bg-gray-50 p-4 rounded border overflow-x-auto text-sm font-mono"
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {flakeContent}
    </pre>
  );
};

export default FlakePreview;
