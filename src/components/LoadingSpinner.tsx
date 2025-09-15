import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
        
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-emerald-100 rounded-full animate-spin border-t-emerald-400 animate-reverse"></div>
      </div>
      
      <p className="mt-4 text-emerald-700 font-medium animate-pulse">
        Loading Islamic quotes...
      </p>
    </div>
  );
};

export default LoadingSpinner;