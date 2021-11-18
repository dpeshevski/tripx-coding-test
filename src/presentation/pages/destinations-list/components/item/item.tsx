import React from 'react';
import { GetDestinationsList } from '@/domain/usecases';

import useStyles from './item-styles.scss';
type Props = {
  destination: GetDestinationsList.Model;
}

const Item: React.FC<Props> = ({ destination }: Props) => {
  const {
    name,
    slug,
    thumbnail,
    code,
    countHotels,
    countDestinations,
  } = destination;

  return (
    <li className={useStyles.destinationItemContainer}>
      <a className={useStyles.destinationItemContent} href={slug}>
        <img src={thumbnail} alt={code} />
        <h4 className={useStyles.destinationName}>{name}</h4>
        <div className={useStyles.infoCount}>
          <p className={useStyles.destinationCount}>
            <span><strong>{countDestinations}</strong></span><span> destination</span>
          </p>
          <p className={useStyles.hotelsCount}>
            <span><strong>{countHotels}</strong> hotels</span>
          </p>
        </div>
      </a>
    </li>
  )
}

export default Item;