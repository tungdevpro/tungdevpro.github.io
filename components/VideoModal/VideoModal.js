import styles from './videomodal.module.css';
import OutsideClickHandler from 'react-outside-click-handler';
import { useState } from 'react';
import cn from 'classnames';

export default function Modal({ closeModal, setModal, modal, embed }) {
  const [videoLoading, setVideoLoading] = useState(true);

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setModal(false)}>
      <div modal={modal} className={styles.content}>
        <button
          className={cn('button-svg', styles.close_button)}
          onClick={closeModal}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M16.7729 8.28771C17.0658 7.99481 17.0658 7.51994 16.7729 7.22705C16.48 6.93415 16.0052 6.93415 15.7123 7.22705L16.7729 8.28771ZM7.22699 15.7123C6.9341 16.0052 6.9341 16.4801 7.22699 16.773C7.51989 17.0659 7.99476 17.0659 8.28765 16.773L7.22699 15.7123ZM15.7123 16.7729C16.0052 17.0658 16.48 17.0658 16.7729 16.7729C17.0658 16.48 17.0658 16.0052 16.7729 15.7123L15.7123 16.7729ZM8.28765 7.22699C7.99476 6.9341 7.51989 6.9341 7.22699 7.22699C6.9341 7.51989 6.9341 7.99476 7.22699 8.28765L8.28765 7.22699ZM15.7123 7.22705L7.22699 15.7123L8.28765 16.773L16.7729 8.28771L15.7123 7.22705ZM16.7729 15.7123L8.28765 7.22699L7.22699 8.28765L15.7123 16.7729L16.7729 15.7123Z' />
          </svg>
        </button>
        <iframe
          className={styles.video}
          onLoad={spinner}
          loading='lazy'
          src={embed}
          title='La Incondicional'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
        ></iframe>
        {videoLoading ? (
          <div className={styles.loading_container}>
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : null}
      </div>
    </OutsideClickHandler>
  );
}
