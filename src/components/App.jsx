import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { fetchImages } from 'services/images-api';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ButtonLoadMore } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [imageList, setImageList] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!filter) return;

    setLoading(true);
    getImages(page, filter);
  }, [filter, page]);

  const getImages = async (page, inputedString) => {
    const {
      data: { hits, totalHits },
    } = await fetchImages(inputedString, page);
    setLoading(false);

    setTotalHits(totalHits);
    setImageList(prevImages =>
      prevImages.length !== 0 ? [...prevImages, ...hits] : hits
    );

    if (totalHits === 0) {
      toast.error('Nothing found');
    }

    if (totalHits !== 0 && !(totalHits > page * 12)) {
      toast.error('You have reached the end of the page');
    }
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const formSubmit = inputedString => {
    if (filter === inputedString) return;

    setFilter(inputedString);
    setPage(1);
    setImageList([]);
  };

  const showBigImg = bigImg => {
    setImage(bigImg);
  };

  const hideBigImg = () => {
    setImage('');
  };

  return (
    <>
      <Searchbar formSubmit={formSubmit} />
      {imageList.length > 0 && (
        <ImageGallery imageList={imageList} showBigImg={showBigImg} />
      )}

      {loading && <Loader />}

      {imageList.length > 0 && totalHits > page * 12 && (
        <ButtonLoadMore changePage={changePage} />
      )}

      {}
      {image && <Modal bigPoster={image} hideBigImg={hideBigImg} />}
      <ToastContainer autoClose={3000} />
    </>
  );
}
