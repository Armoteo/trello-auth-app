import { LOCATION_CHANGE } from 'connected-react-router';

export const navigate = (url: string) => ({
    type: LOCATION_CHANGE,
    payload: {
      location: {
        pathname: url,
      },
      action: 'POP'
    }
  }
);
