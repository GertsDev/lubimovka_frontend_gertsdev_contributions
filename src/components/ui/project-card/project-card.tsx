import Link from 'next/link';
import { FC } from 'react';
import classNames from 'classnames/bind';

import { Icon } from '../icon/icon';
import { Url } from '../../../shared/types/common';

import styles from './project.module.css';

const cx = classNames.bind(styles);

interface IProjectCardProps {
  id: number,
  title: string;
  description: string;
  image: Url;
}

export const ProjectCard: FC<IProjectCardProps> = (props) => {
  const {
    id,
    title,
    description,
    image,
  } = props;

  return (
    <Link href={`/project/${id}`}>
      <a className={cx('link')}>
        <article className={cx('card')}>
          <div className={cx('imgContainer')}>
            <img className={cx('image')} src={image} alt={title} />
          </div>
          <div>
            <h2 className={cx('title')}>
              {title}
              <Icon className={cx('titleArrow')} glyph="arrow-right" fill='#000' focusable="false" />
            </h2>
            <p
              className={cx('description')}
            >
              {description}
            </p>
          </div>
        </article>
      </a>
    </Link>
  );
};