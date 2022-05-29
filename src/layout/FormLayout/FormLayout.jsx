import React, { useContext } from 'react';
import Form from '../../components/Form';
import { UserContext } from '../../store';
import imgSuccess from './images/success-image.svg';

const FormLayout = () => {
  const {
    state: { formSent },
  } = useContext(UserContext);

  return (
    <section className="form" id="form">
      <div className="container">
        <h2 className="form__title">
          {formSent
            ? 'User successfully registered'
            : 'Working with POST request'}
        </h2>
        {formSent ? (
          <div className="form__img-wrapper">
            <div className="form__img">
              <img src={imgSuccess} alt="description" />
            </div>
          </div>
        ) : (
          <Form />
        )}
      </div>
    </section>
  );
};

export default FormLayout;
