import axios from 'axios';

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token:
      'pk.eyJ1IjoiZGFubnlvbGl2YTQ3IiwiYSI6ImNrbnczMHc1ajBvaXUyb21tN3Vyajk1YmMifQ.6wephva17iAAvEOidnndkA',
  },
});

export default searchApi;
