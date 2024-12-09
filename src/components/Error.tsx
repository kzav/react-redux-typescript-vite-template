import React from 'react';
import { useSelector } from 'react-redux';

interface ErrorState {
  current: {
    error: string | null
  }  
}

const Error = () => {
  const error = useSelector((state: ErrorState) => state.current.error);
  const errorStyle: React.CSSProperties = { whiteSpace: 'pre-wrap' };
  return (
    <div>
      <p className="err" style={errorStyle}>{error}</p>
    </div>
  );
};

export default Error;
