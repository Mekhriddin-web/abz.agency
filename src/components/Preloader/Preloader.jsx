import React from 'react';
import imgLoader from './images/loader.svg';

const Preloader = () => {
  return (
    <div className="loader">
      <div className="loader__img">
        <img src={imgLoader} alt="Loader" />
      </div>
    </div>
  );
};

export default Preloader;
