import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { AppLayout } from 'components/app-layout/index';
import { HistoryPage } from 'components/history-page';
import { SEO } from 'components/seo';
import { fetcher } from 'services/fetcher';
import { Festival, Years, PlayFilters } from 'api-typings';

const History = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    years, titleCounts
  } = props;
  return (
    <AppLayout>
      <SEO
        title="История фестиваля"
      />
      <HistoryPage years={years} titleCounts={titleCounts}/>
    </AppLayout>
  );
};

export default History;
const fetchStatistics = async (year: number) => {
  let data;
  try {
    data = await fetcher<Festival>(`/info/festivals/${year}/`);
  } catch (error) {
    return;
  }
  return data;
};
const fetchInitStateYear = async () => {
  let data;
  try {
    data = await fetcher<Years>('/info/festivals/years/');
  } catch (error) {
    return;
  }
  return data;
};
const fetchPlayFilters = async () => {
  let data;
  try {
    data = await fetcher<PlayFilters>('/library/playfilters/');
  } catch (error) {
    return;
  }
  return data;
};
type History = {
  titleCounts : Festival,
  years : Years,
}
export const getServerSideProps: GetServerSideProps<History> = async () => {
  const years = await fetchInitStateYear();

  if (!years) {
    return {
      notFound: true,
    };
  }

  const titleCounts = await fetchStatistics(years.years[0]);

  if (!titleCounts) {
    return {
      notFound: true,
    };
  }

  const playFilters = await fetchPlayFilters();

  if (!playFilters) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      titleCounts: titleCounts, years: years
    },
  };
};
