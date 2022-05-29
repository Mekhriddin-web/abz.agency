import classNames from 'classnames';
import React, { useState } from 'react';

const File = ({ handleBlur, errors, register, watch }) => {
  const [photoFocused, setPhotoFocused] = useState(false);

  const photo = watch('photo');

  return (
    <label
      className={classNames('form__label', {
        focus: photoFocused,
        error: !!errors.photo,
      })}
    >
      <input
        type="file"
        name="photo"
        onFocus={() => setPhotoFocused(true)}
        onBlur={e => handleBlur(e, setPhotoFocused)}
        {...register('photo')}
      />
      <span className="form__file">
        <span className="form__file-btn">Upload</span>
        <span className={classNames('form__file-text', { active: photo?.[0] })}>
          {photo?.[0] ? photo[0].name : 'Upload your photo'}
        </span>
      </span>
      {!!errors.photo && (
        <span className="form__error">{errors?.photo?.message}</span>
      )}
    </label>
  );
};

export default File;
