import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemStyled, ImageGallery } from './ImageFinder.styled';
import Modal from './Modal';

function ImageGalleryItem({ hit }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { largeImageURL, previewURL, tags } = hit;

  return (
    <>
      <ImageGalleryItemStyled onClick={toggleModal}>
        <ImageGallery src={previewURL} alt={tags} loading="lazy" />
      </ImageGalleryItemStyled>
      {showModal && (
        <Modal toggleModal={toggleModal} imageURL={largeImageURL} tags={tags} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    previewURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    // Добавьте другие свойства изображения, если есть
  }).isRequired,
};

export default ImageGalleryItem;
