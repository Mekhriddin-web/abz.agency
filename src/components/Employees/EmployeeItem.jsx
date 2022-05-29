import React, { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import imgPhoto from './images/photo-cover.svg';

const EmployeeItem = ({ email, name, phone, photo, position }) => {
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [titleChildWidth, setTitleChildWidth] = useState(0);
  const [emailWidth, setEmailWidth] = useState(0);
  const [emailChildWidth, setEmailChildWidth] = useState(0);

  useEffect(() => {
    setTitleWidth(titleRef.current.offsetWidth);
    setTitleChildWidth(titleRef.current.firstElementChild.offsetWidth);

    setEmailWidth(emailRef.current.offsetWidth);
    setEmailChildWidth(emailRef.current.firstElementChild.offsetWidth);
  }, []);

  return (
    <li className="employees__item">
      <div className="employees__item-inner">
        <div className="employees__item-wrapper">
          <div className="employees__item-img">
            <img
              src={
                photo.includes('jpg') || photo.includes('jpeg')
                  ? photo
                  : imgPhoto
              }
              alt={name}
            />
          </div>
        </div>
        <h3 className="offset-bot-first" ref={titleRef}>
          {titleWidth >= titleChildWidth ? (
            <span>{name}</span>
          ) : (
            <Tippy content={name} placement="bottom-end" arrow={false}>
              <span>{name}</span>
            </Tippy>
          )}
        </h3>
        <p>{position}</p>
        <p ref={emailRef}>
          {emailWidth >= emailChildWidth ? (
            <span>{email}</span>
          ) : (
            <Tippy content={email} placement="bottom-end" arrow={false}>
              <span>{email}</span>
            </Tippy>
          )}
        </p>
        <p>{phone}</p>
      </div>
    </li>
  );
};

export default EmployeeItem;
