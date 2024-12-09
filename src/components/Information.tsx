import React from 'react';
import { useSelector } from 'react-redux';

interface InformationState {
  current: {
    info: string | null
  }  
}

const Information = () => {
  const info = useSelector((state: InformationState) => state.current.info);
  const errorStyle: React.CSSProperties = { whiteSpace: 'pre-wrap' };
  return (
    <div>
      <p className="info" style={errorStyle}>{info}</p>
    </div>
  );
};

export default Information;
