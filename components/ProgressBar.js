import React from 'react';

const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    React.createElement('div', { className: "fixed bottom-0 left-0 w-full h-1.5 bg-stone-200 z-50" },
      React.createElement('div', {
        className: "h-full bg-stone-800 transition-all duration-300 ease-out",
        style: { width: `${progress}%` }
      })
    )
  );
};

export default ProgressBar;