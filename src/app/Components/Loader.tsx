import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-blue-500 rounded-full shadow-lg animate-[bounce_1.2s_ease-in-out_infinite] [animation-delay:0s]" />
          <div className="w-6 h-6 bg-purple-500 rounded-full shadow-lg animate-[bounce_1.2s_ease-in-out_infinite] [animation-delay:0.15s]" />
          <div className="w-6 h-6 bg-pink-500 rounded-full shadow-lg animate-[bounce_1.2s_ease-in-out_infinite] [animation-delay:0.3s]" />
        </div>
        <p className="text-gray-500 text-sm animate-pulse">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
