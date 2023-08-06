import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar, ImageGallery, Button, Loader } from './ImageFinder';
import { getImages } from '../utils/api';

const App = () => {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await getImages(searchQuery, page);
        const newTotalPages = Math.ceil(response.totalHits / 12);

        if (response.hits.length === 0) {
          Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setHits(prevHits => [...prevHits, ...response.hits]);
        setTotalPages(newTotalPages);

        if (page === 1) {
          Notify.success(`Hooray! We found ${response.totalHits} images.`);
        }

        if (page >= newTotalPages) {
          Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } catch (error) {
        setError(error);
        Notify.failure(`Oops, something went wrong: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleSubmit = data => {
    setHits([]);
    setSearchQuery(data.queryValue);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const isNotEmpty = hits.length !== 0;
  const isNotEndList = page < totalPages;

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isNotEmpty && <ImageGallery images={hits} />}
      {isLoading ? (
        <Loader />
      ) : (
        isNotEmpty && isNotEndList && <Button onLoadMore={handleLoadMore} />
      )}
    </>
  );
};

export default App;
