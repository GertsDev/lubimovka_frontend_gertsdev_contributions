import { PersonCard } from '../ui/person-card/person-card';
import { Sponsor } from '__generated__/api-typings';

import style from './persons-list.module.css';
import cn from 'classnames';

interface PersonsListProps {
  persons: Array<Sponsor>
}

const getClass = (number:number) => {
  if(number < 4) {
    return 'linear';
  }

  if(number === 5) {
    return 'five';
  }
  if(number % 3 === 0 && number < 16) {
    return 'three';
  }
  return 'four';
};

const PersonsList: React.FC<PersonsListProps> = ({ persons }) => {

  return (
    <ul className={cn(style.personsList, style[getClass(persons.length)])}>
      {persons.map((person) => (
        <li key={person.id} className={style.personsListItem}>
          <PersonCard
            participant
            image={person.person.image}
            about={person.position}
            name={`${person.person.first_name} ${person.person.last_name}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default PersonsList;
