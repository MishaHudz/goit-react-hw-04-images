import PropTypes from 'prop-types';
import { useEffect } from 'react';
import style from './Modal.module.css';

export function Modal({ hideBigImg, bigPoster }) {
  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape);
    return () => {
      document.removeEventListener('keydown', handlePressEscape);
    };
  });

  const handlePressEscape = evt => {
    if (evt.code !== 'Escape') return;

    hideBigImg();
  };

  const handleBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      hideBigImg();
    }
  };

  return (
    <>
      <div className={style.overlay} onClick={handleBackdrop}>
        <div className={style.modal}>
          <img src={bigPoster} alt="" />
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  bigPoster: PropTypes.string.isRequired,
  hideBigImg: PropTypes.func.isRequired,
};
