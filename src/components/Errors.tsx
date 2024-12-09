import React from 'react';
import { useSelector } from 'react-redux';

interface ErrorsState {
  current: {
    errors: string[] 
  }  
}

const Errors = () => {
  const errors = useSelector((state: ErrorsState) => state.current.errors);
  const errorStyle: React.CSSProperties = { whiteSpace: 'pre-wrap' };
  if (errors.length > 0) {
    return (
      <div>
        <ul>
          {errors.map((error: string)=>
          <li className="err" style={errorStyle}>{error}</li>
          )}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
      </div>
    );
  }
};

export default Errors;
