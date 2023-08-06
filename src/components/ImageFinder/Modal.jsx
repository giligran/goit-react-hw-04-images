import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './ImageFinder.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ imageURL, tags, toggleModal }) {
  const overlayRef = React.useRef();

  const onKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  const overlayClick = useCallback(
    e => {
      if (e.target === overlayRef.current) {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return createPortal(
    <Overlay ref={overlayRef} onClick={overlayClick}>
      <ModalContainer>
        <img src={imageURL} alt={tags} />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
