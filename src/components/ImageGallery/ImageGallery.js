import { useState, useEffect } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import ImagesAPI from '../../Api/img-api';
import LoaderSpinner from '../Loader';

const ImageGallery = ({ query }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setCurrentPage(1);
    setImages([]);
  }, [query]);

  useEffect(() => {
    if (!query) {
      return;
    };

    setStatus('pending'); 
   
    ImagesAPI.fetchImages(query, currentPage)
      .then(response => {
        setImages((images) => [...images, ...response.hits]);
        setStatus('resolved');

        if (response.hits.length === 0) {
          setError('По вашему запросу ничего не найдено.');
          setStatus('rajected');
        };
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch((error) => {
        setError(error);
        setStatus('rajected');
      });
  }, [currentPage, query]
  );    
   
  // const onLoadMore = () => {
  //   setCurrentPage(state => state + 1);
  // }

  if (status === 'idle') {
      return <div className="Status">Введите запрос в поле поиска</div>;
    }

    if (status === 'pending') {
      return (
        <div>          
          <LoaderSpinner />
        </div>
      );
    }

    if (status === 'rajected') {
      return <div className="Status-error">{error}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(img => (
              <ImageGalleryItem
                key={img.webformatURL}
                smallImg={img.webformatURL}
                largeImage={img.largeImageURL}
                id={img.id}
                tags={img.tags}
              />
            ))}
          </ul>
          {images.length > 0 && <Button onClick={()=> setCurrentPage(currentPage + 1)} />}
        </>
      );
    }
}


export default ImageGallery;