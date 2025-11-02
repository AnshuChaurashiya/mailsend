import React from 'react';

const EmailPreview = ({ emails }) => {
  if (!emails || emails.length === 0) {
    return <p className="text-gray-500">No emails to preview.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Email Preview ({emails.length} recipients)</h3>
      <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
        {emails.map((email, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailPreview;
