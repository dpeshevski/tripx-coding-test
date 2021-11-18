import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { Header, Footer, Error, Loading } from '@/presentation/components';

import { GetDestinationsList } from '@/domain/usecases';

import { List, getDestinationsListState } from '@/presentation/pages/destinations-list/components';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  destinationsList: GetDestinationsList,
}

import useStyles from './destinations-list-styles.scss';

const DestinationsList: React.FC<Props> = ({ destinationsList }: Props) => {
  const [state, setState] = useRecoilState(getDestinationsListState);

  const reload = (): void => setState(state => ({
    destinations: [] as GetDestinationsList.Model[],
    error: '',
    reload: !state.reload,
    isLoading: true,
  }));

  const handleError = useErrorHandler((error: Error) => {
    setState(state => ({
      ...state,
      error: error.message
    }));
  });
  
  const resetDestinationsListState = useResetRecoilState(getDestinationsListState);
  
  useEffect(() => resetDestinationsListState(), []);

  useEffect(() => {
    setState(state => ({ ...state, isLoading: true }));

    destinationsList.getDestinationsList()
      .then(destinations => setState(state => ({ ...state, destinations, isLoading: false})))
      .catch(handleError);
  }, [state.reload]);

  return (
    <div className={useStyles.destinationsListWrap}>
      <Header />
      <div className={useStyles.contentWrap}>
        {!state.isLoading && 
          <div className={useStyles.introWrap}>
            <h1 className={useStyles.title}>Destinations</h1>
            <div className={useStyles.paragraphs}>
              <p>Start your vacation the right way, by choosing the best stay for you. Home to an array of luxurious five-star retreats, as well as a selection of budget-friendly three-star hotels – there is something to suit every travellers style. </p>
              <p>With us you will find trips for all budgets.</p>
              <p>Enjoy a family vacation at an unbeatable price.</p>
              <p>Book your trip now!</p>
            </div>
            <h1 className={useStyles.subtitle}>Countries: <span>{state.destinations.length}</span> </h1>
          </div>
        }
        {state.destinations && <List destinations={state.destinations}/>}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default DestinationsList;