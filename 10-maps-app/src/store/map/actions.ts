import { directionsApi } from '../../api';
import { DirectionsResponse } from '../../interfaces/directions';
import { MapState } from './state';

type Commit = (mutation: string, val?: any) => void;

interface Args {
  commit: Commit;
  state: MapState;
}

export type LngLat = [number, number];

const actions = {
  async getRouteBetweenPoints(
    { commit }: Args,
    { start, end }: { start: LngLat; end: LngLat }
  ) {
    const resp = await directionsApi.get<DirectionsResponse>(
      `${start.join(',')};${end.join(',')}`
    );

    commit('setDistanceDuration', {
      distance: resp.data.routes[0].distance,
      duration: resp.data.routes[0].duration,
    });

    commit('setRoutePolyline', resp.data.routes[0].geometry.coordinates);
  },
};

export default actions;
