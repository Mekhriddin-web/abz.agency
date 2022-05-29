import React, { useEffect, useState } from 'react';
import { getPositions } from '../../../api';
import Preloader from '../../Preloader';

const Positions = ({ register }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getPositions().then(data => {
      setPositions(data.positions);
    });
  }, []);

  return (
    <>
      {positions.length > 0 ? (
        <div className="form__radio-group">
          <span className="form__radio-title">Select your position</span>
          {positions.map(pos => {
            return (
              <label className="form__radio-label" key={pos.id}>
                <input
                  type="radio"
                  name="position_id"
                  defaultChecked={pos.id === 1}
                  value={pos.id}
                  {...register('position_id')}
                />
                <span className="form__radio"></span>
                {pos.name}
              </label>
            );
          })}
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default Positions;
