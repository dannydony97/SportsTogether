import React, {FC, createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {PlacesContextInterface, PlacesProviderProps} from './types';
import {PlacesCollection} from '../api/datamodel/PlacesCollection';
import {PlaceData} from '../api/datamodel/types';

const PlacesContext = createContext<PlacesContextInterface | null>(null);

const PlacesProvider: FC<PlacesProviderProps> = ({children}) => {
  /**
   * Places collection object instance
   */
  const placesCollection = useRef(new PlacesCollection());

  /**
   * Places data
   */
  const [places, setPlaces] = useState<PlaceData[]>([]);

  /**
   * Fetches all the places
   */
  const fetchPlaces = useCallback(async (): Promise<PlaceData[]> => {
    return await placesCollection.current.getData();
  }, []);

  /**
   * Refreshes the places array
   */
  const refreshPlaces = useCallback(async (): Promise<void> => {
    const places = await fetchPlaces();
    setPlaces(places);
  }, [fetchPlaces]);

  useEffect(() => {
    refreshPlaces();
  }, [refreshPlaces]);

  return <PlacesContext.Provider value={{places, refreshPlaces}}>{children}</PlacesContext.Provider>;
};

export function usePlaces(): PlacesContextInterface {
  const placesContext = useContext(PlacesContext);
  if (!placesContext) {
    throw new Error("'usePlaces()' called outside of PlacesProvider?");
  }
  return placesContext;
}

export default PlacesProvider;
