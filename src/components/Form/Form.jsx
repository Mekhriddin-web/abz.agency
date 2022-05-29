import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUsers, postUser } from '../../api';
import { UserContext } from '../../store';
import { setTotalPages, setUsers, submitForm } from '../../store/action';
import File from './File';
import Positions from './Positions';
import classNames from 'classnames';

const schem = yup.object().shape({
  name: yup
    .string()
    .min(2, 'The name must be at least 2 characters.')
    .max(60, 'The name must be no more than 60 characters.')
    .required('Name required field.'),
  email: yup
    .string()
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      'The email must be a valid email address.'
    )
    .required('Email required field.'),
  phone: yup
    .string()
    .matches(/^[\+][1]{0,1}380([0-9]{9})$/, 'The phone field is not a valid.')
    .required('Phone required field.'),
  photo: yup
    .mixed()
    .test('required', 'Photo required field.', value => {
      return value && value.length;
    })
    .test('fileSize', 'The photo may not be greater than 5 Mbytes.', value => {
      return value[0] && value[0].size <= 5000000;
    })
    .test('fileType', 'Image is invalid.', value => {
      return value[0] && value[0].type === 'image/jpeg';
    })
    .test(
      'fileScale',
      'Photo cannot be less than 70 px in width and height',
      value => {
        if (value[0]) {
          const img = new Image();
          img.src = window.URL.createObjectURL(value[0]);

          return (img.onload = () => {
            return value[0] && img.width > 70 && img.height > 70;
          });
        }
      }
    ),
});

const Form = () => {
  const { dispatch } = useContext(UserContext);

  const [formError, setFormError] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const handleBlur = (e, removeFocus) => {
    if (e.target.value.trim() === '') {
      removeFocus(false);
    }
  };

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', data.position_id);
    formData.append('photo', data.photo[0]);

    postUser(formData)
      .then(data => {
        if (data.success) {
          setFormError('');
          getUsers().then(dataUsers => {
            dispatch(setUsers(dataUsers.users));
            dispatch(setTotalPages(dataUsers.total_pages));
          });
          dispatch(submitForm());
        } else {
          setFormError(data.message);
          throw new Error();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schem),
  });

  return (
    <form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
      <label
        className={classNames('form__label', {
          focus: nameFocused,
          error: !!errors.name,
        })}
      >
        <input
          {...register('name')}
          type="text"
          name="name"
          className="form__input"
          onFocus={() => setNameFocused(true)}
          onBlur={e => handleBlur(e, setNameFocused)}
        />
        <span className="form__input-placeholder">Your name</span>
        {!!errors.name && (
          <span className="form__error">{errors?.name?.message}</span>
        )}
      </label>
      <label
        className={classNames('form__label', {
          focus: emailFocused,
          error: !!errors.email,
        })}
      >
        <input
          {...register('email')}
          type="email"
          name="email"
          className="form__input"
          onFocus={() => setEmailFocused(true)}
          onBlur={e => handleBlur(e, setEmailFocused)}
        />
        <span className="form__input-placeholder">Email</span>
        {!!errors.email && (
          <span className="form__error">{errors?.email?.message}</span>
        )}
      </label>
      <label
        className={classNames('form__label', {
          focus: phoneFocused,
          error: !!errors.phone,
        })}
      >
        <input
          {...register('phone')}
          type="tel"
          name="phone"
          className="form__input"
          onFocus={() => setPhoneFocused(true)}
          onBlur={e => handleBlur(e, setPhoneFocused)}
        />
        <span className="form__input-placeholder">Phone</span>
        {!!errors.phone && (
          <span className="form__error">{errors?.phone?.message}</span>
        )}
      </label>
      <Positions register={register} />
      <File
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        watch={watch}
      />
      {formError && (
        <strong className="form__wrapper-error">{formError}</strong>
      )}
      <button type="submit" className="btn btn-center" disabled={!isValid}>
        Sign up
      </button>
    </form>
  );
};

export default Form;
