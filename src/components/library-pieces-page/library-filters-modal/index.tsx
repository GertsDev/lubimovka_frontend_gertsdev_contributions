import { FC } from 'react';

import LibraryFilter from 'components/library-filter/library-filter';
import { Button } from 'components/ui/button';

import styles from './index.module.css';

const LibraryFiltersModal: FC = () => {
  return (
    <section className={styles.wrap}>
      <LibraryFilter />
      <div className={styles.buttons}>
        <Button width='scale(183px)' size='l' iconPlace='right' icon='cross'
          label='Очистить' border='full' />
        <Button width='scale(183px)' size='l' iconPlace='right' icon='arrow-right'
          label='Посмотреть' border='full' />
      </div>
    </section>
  );
};

export default LibraryFiltersModal;