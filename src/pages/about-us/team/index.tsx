import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { AboutUsLayout } from 'components/about-us-layout';
import { AppLayout } from 'components/app-layout';
import { DialogWindow } from 'components/dialog-window';
import { FeedbackCard } from 'components/feedback-card';
import { FeedbackCarousel } from 'components/feedback-carousel';
import { HTMLMarkup } from 'components/html-markup';
import { Note } from 'components/note';
import { PersonCard } from 'components/person-card';
import { SEO } from 'components/seo';
import ArtDirectorateSection from 'components/team-page/art-directorate/section/art-directorate-section';
import FestivalTeamSection from 'components/team-page/festival-team/festival-team-section';
import { Modal } from 'components/ui/modal';
import { SliderDots } from 'components/ui/slider-dots';
import { VolunteerList } from 'components/volunteer-list';
import { VolunteerSection } from 'components/volunteer-section';
import { useSettings } from 'services/api/settings-adapter';
import { fetcher } from 'services/fetcher';

import type { FestivalTeams, Volunteers } from '__generated__/api-typings';
import type { InferGetServerSidePropsType } from 'next';

const Team = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    artDirectorate,
    volunteers,
    restTeam,
  } = props;

  const router = useRouter();
  const queryYear = Number(router.query.year);

  const years = useMemo(() => {
    return Array.from(new Set(volunteers.map(({ year }) => year))).sort().reverse();
  }, [volunteers]);

  const [currentYear, setCurrentYear] = useState(queryYear ? queryYear : years[0]);
  const [currentItemIndex, setCurrenItemIndex] = useState(0);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const { settings } = useSettings();

  const showFeedbackDialog = (index: number) => () => {
    setCurrenItemIndex(index);
    setFeedbackDialogOpen(true);
  };

  const handleFeedbackDialogClose = () => {
    setFeedbackDialogOpen(false);
  };

  const getVolunteersByYear = (year: number) => volunteers.filter((volunteer) => volunteer.year === year);

  return (
    <>
      <SEO title="Организаторы"/>
      <AppLayout>
        <AboutUsLayout>
          <ArtDirectorateSection cards={artDirectorate}/>
          <FestivalTeamSection cards={restTeam}/>
          <VolunteerSection
            title="Волонтёры"
            festivalYears={years}
            selectedFestivalYear={currentYear}
            onFestivalYearSelect={setCurrentYear}
            {...settings?.emailAddresses.forVolunteers && {
              note: (
                <Note>
                  <HTMLMarkup>
                    Если вы хотите быть волонтером, напишите нам на
                    {' '}
                    <a href={`mailto:${settings?.emailAddresses.forVolunteers}`}>
                      {settings?.emailAddresses.forVolunteers}
                    </a>
                    {' '}
                    и расскажите о себе.
                  </HTMLMarkup>
                </Note>
              )
            }}
          >
            <VolunteerList>
              {getVolunteersByYear(currentYear).map((card, index) => (
                <VolunteerList.Item key={card.person.id}>
                  <PersonCard
                    fullName={`${card.person.first_name} ${card.person.last_name}`}
                    photoUrl={card.person.image}
                    {...hasFeedback(card) && {
                      onClick: showFeedbackDialog(index)
                    }}
                  />
                </VolunteerList.Item>
              ))}
            </VolunteerList>
          </VolunteerSection>
        </AboutUsLayout>
      </AppLayout>
      <Modal
        isOpen={feedbackDialogOpen}
        onClose={handleFeedbackDialogClose}
        backdrop={Modal.Backdrop}
      >
        <DialogWindow
          variant="feedback"
          onClose={handleFeedbackDialogClose}
        >
          <FeedbackCarousel initialItemIndex={currentItemIndex}>
            {({ loaded, handleForward, handleBackward, currentItemIndex, handleCurrentItemChange }) => getVolunteersByYear(currentYear).filter(hasFeedback).map((item, index, items) => (
              <FeedbackCarousel.Item key={index}>
                {loaded && (
                  <FeedbackCard
                    author={`${item.person.first_name} ${item.person.last_name}`}
                    photoUrl={item.person.image}
                    tldr={item.review_title}
                    text={item.review_text!} // TODO: уточнить у бекендеров, почему текст отзыва опциональный
                    onForward={handleForward}
                    onBackward={handleBackward}
                    pagination={(
                      <SliderDots
                        currentSlide={currentItemIndex}
                        count={items.length}
                        onClick={handleCurrentItemChange}
                      />
                    )}
                  />
                )}
              </FeedbackCarousel.Item>
            ))}
          </FeedbackCarousel>
        </DialogWindow>
      </Modal>
    </>
  );
};

export const getServerSideProps = async () => {
  const team = await fetcher<FestivalTeams[]>('/info/about-festival/team/');
  const volunteers = await fetcher<Volunteers[]>('/info/about-festival/volunteers/'); // TODO: TT не получать всех волонтеров разом, разбить на отдельные запросы

  const { art: artDirectorate, fest: restTeam } = team.reduce<Record<string, FestivalTeams[]>>((acc, entry) => {
    (acc[entry.team] || (acc[entry.team] = [])).push(entry);

    return acc;
  }, {});

  return {
    props: {
      artDirectorate,
      volunteers,
      restTeam,
    },
  };
};

export default Team;

function hasFeedback(volunteer: {
  review_title?: string
  review_text?: string
}) {
  return Boolean(volunteer.review_text || volunteer.review_title);
}
