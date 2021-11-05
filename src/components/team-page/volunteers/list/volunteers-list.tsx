import React, { FC, useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import styles from './volunteers-list.module.css';
import classNames from 'classnames';

import PersonCard from '../../../ui/person-card/person-card';
import { FeedbackPopup } from 'components/ui/feedback-popup';

const cx = classNames.bind(styles);

interface PersonCardData {
  id: number;
  person: {
    id: number;
    first_name: string;
    second_name: string;
    middle_name: string;
    city: string;
    email: string;
    image: string;
  };
  year: number;
  title: string;
  review: string;
}

interface VolunteersCardsProps {
  cards: Array<PersonCardData>
}

const VolunteersList: FC<VolunteersCardsProps> = ({ cards }) => {
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

  function handleFeedbackPopupClick() {
    setIsFeedbackPopupOpen(true);
  }

  function closeFeedbackPopup() {
    setIsFeedbackPopupOpen(false);
  }

  const handleEscClose = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeFeedbackPopup();
    }
  };

  useEffect(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    slider?.refresh();
  }, [screenWidth]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return() =>{
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  return (
    <>
      {
        Number(screenWidth) < 729 &&
        <div ref={sliderRef} className={cx('keen-slider', [styles.slidesContainer])}>
          {cards.map((card) => (
            <div key={card.id} className="keen-slider__slide">
              <PersonCard
                participant={false}
                link={card.person.image}
                response={card.review}
                name={`${card.person.first_name} ${card.person.second_name}`}
                handleClick={() => handleFeedbackPopupClick()}
              >
              </PersonCard>
            </div>
          ))}
        </div>
      }

      {
        Number(screenWidth) > 728 &&
        <ul className={styles.container}>
          {cards.map((card) => (
            <li key={card.id}>
              <PersonCard
                participant={false}
                link={card.person.image}
                response={card.review}
                name={`${card.person.first_name} ${card.person.second_name}`}
                handleClick={() => handleFeedbackPopupClick()}
              >
              </PersonCard>
            </li>
          ))}
        </ul>
      }

      <FeedbackPopup cards={cards} isOpen={isFeedbackPopupOpen} onClose={closeFeedbackPopup}/>
    </>
  );
};

export default VolunteersList;