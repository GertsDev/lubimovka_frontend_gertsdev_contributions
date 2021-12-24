import React, { FC, useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import classNames from 'classnames';
import { disableBodyScroll, enableBodyScroll } from '@funboxteam/diamonds';

import { PersonCard } from '../../../ui/person-card/person-card';
import { FeedbackPopup } from 'components/ui/feedback-popup';
import { Volunteers } from 'api-typings';

import styles from './volunteers-list.module.css';

const cx = classNames.bind(styles);

interface VolunteersCardsProps {
  cards: Array<Volunteers>,
  currentYear: number
}

const VolunteersList: FC<VolunteersCardsProps> = ({ cards, currentYear }) => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    spacing: 30,
    slidesPerView: 3,
    breakpoints: {
      '(max-width: 728px)': {
        slidesPerView: 2.5,
        mode: 'free-snap',
      },
      '(max-width: 650px)': {
        slidesPerView: 2,
        mode: 'free-snap',
      },
      '(max-width: 520px)': {
        slidesPerView: 1.7,
        mode: 'free-snap',
      },
      '(max-width: 450px)': {
        slidesPerView: 1.5,
        mode: 'free-snap',
      },
    },
  });

  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  function handleFeedbackPopupClick(idx: number) {
    setIsFeedbackPopupOpen(true);
    setSlide(idx);
  }

  function closeFeedbackPopup() {
    setIsFeedbackPopupOpen(false);
  }

  const handleEscClose = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeFeedbackPopup();
    }
  };

  const handleOverlayClose = (evt: MouseEvent)  => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains('keen-slider__slide')) {
      closeFeedbackPopup();
    }
  };

  useEffect(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    slider?.refresh();
  }, [screenWidth, currentYear]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClose);
    return() =>{
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    };
  }, []);

  useEffect(() => {
    isFeedbackPopupOpen ? disableBodyScroll({ savePosition: true }) : enableBodyScroll();

    return () => enableBodyScroll();
  }, [isFeedbackPopupOpen]);
  return (
    <>
      {
        Number(screenWidth) < 729 &&
        <div ref={sliderRef} className={cx('keen-slider', [styles.slidesContainer])}>
          {cards.map((card, idx) => (
            <div key={card.id} className="keen-slider__slide">
              <PersonCard
                participant={false}
                image={card.person.image}
                response={card.review_text}
                name={`${card.person.first_name} ${card.person.last_name}`}
                handleClick={() => handleFeedbackPopupClick(idx)}
              >
              </PersonCard>
            </div>
          ))}
        </div>
      }

      {
        Number(screenWidth) > 728 &&
        <ul className={styles.container}>
          {cards.map((card, idx) => (
            <li key={card.id}>
              <PersonCard
                participant={false}
                image={card.person.image}
                response={card.review_text}
                name={`${card.person.first_name} ${card.person.last_name}`}
                handleClick={() => handleFeedbackPopupClick(idx)}
              >
              </PersonCard>
            </li>
          ))}
        </ul>
      }

      <FeedbackPopup currentYear={currentYear} cards={cards} openedSlide={slide} isOpen={isFeedbackPopupOpen} onClose={closeFeedbackPopup}/>
    </>
  );
};

export default VolunteersList;
