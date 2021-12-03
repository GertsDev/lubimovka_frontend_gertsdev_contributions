import React, { ReactNode } from 'react';

import styles from './masonry-grid.module.css';

interface MasonryGridProps {
  children: ReactNode
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {

  // реф для доступа к грид-сетке
  const gridRef = React.useRef<HTMLUListElement>(null);

  // ресайз грид-карточки
  function resizeGridItem(item: HTMLElement | any) {
    const grid = gridRef.current;

    // получаем все вычесленные стили грид-сетки
    if (grid !== null) {
      const gridStyles = window.getComputedStyle(grid);
      // забираем высоту строки и гэпа из грид-сетки
      const rowHeight = parseInt(gridStyles.getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(gridStyles.getPropertyValue('grid-row-gap'));

      // вычисляем нужную высоту контентной части карточки
      const rowSpan = Math.ceil((item.firstChild.offsetHeight + rowGap) / (rowHeight + rowGap));

      //растягиваем карточку на нужное кол-во грид-строк
      // устанавливаем в стили карточки конечную грид-строку, до которой должна растянуться карточка
      item.style.setProperty('grid-row-end', 'span ' + rowSpan);
    }
  }

  // ресайзим все карточки в гриде
  function resizeAllGridItems() {

    // получаем всех карточки грида через реф
    if (null !== gridRef.current) {
      const allItems = gridRef.current.children;

      for (let i = 0; i < allItems.length; i++) {
        resizeGridItem(allItems[i]);

        // после вычисления позиции всех карточек, плавно отображаем сетку,
        // чтобы не было видно, как сетка перестраивается
        if (i === allItems.length - 1) {
          gridRef.current.style.setProperty('opacity', '1');
        }
      }
    }
  }

  // вызываем ресайз карточек при рендере компонентов
  React.useLayoutEffect(() => {
    // ставим слушатель на загрузку дом-дерева и всех стилей, картинок и скриптов
    window.addEventListener('load', resizeAllGridItems);
    // на ресайз
    window.addEventListener('resize', resizeAllGridItems);
    return () => {
      window.removeEventListener('load', resizeAllGridItems);
      window.removeEventListener('resize', resizeAllGridItems);
    };
  }, []);

  return (
    <section className={styles.masonryGridSection}>
      <ul className={styles.masonryGrid} ref={gridRef}>
        {children}
      </ul>
    </section>
  );
};

export default MasonryGrid;
