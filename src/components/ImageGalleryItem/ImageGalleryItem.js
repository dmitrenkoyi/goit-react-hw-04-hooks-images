import { useState } from 'react';

import Modal from '../Modal';

const ImageGalleryItem = ({ smallImg, largeImage, id, tags }) => {
  const [largeImg, setLargeImg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = img => {
    setLargeImg(img);
    toggleModal();
  };

   return (
      <>
        <li
          className="ImageGalleryItem"
          key={id}
          id={id}
          onClick={() => onImageClick(largeImage)}
        >
          <img src={smallImg} alt={tags} className="ImageGalleryItem-image" />
        </li>

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImg} alt="" />
          </Modal>
        )}
      </>
    );
}



export default ImageGalleryItem;
