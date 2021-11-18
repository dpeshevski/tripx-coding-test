import React from 'react';

import useStyles from './list-styles.scss';

import { GetDestinationsList } from '@/domain/usecases';
import { Item } from '@/presentation/pages/destinations-list/components';

type Props = {
  destinations: GetDestinationsList.Model[],
}

const List: React.FC<Props> = ({ destinations }: Props) => {
  return (
    <div>
      <ul className={useStyles.listWrap} data-testid="destinations-list">
        {
          destinations.map(destination => <Item key={destination.code} destination={destination} />)
        }
      </ul>
    </div>
  )
}

export default List;