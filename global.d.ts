// Use type safe message keys with `next-intl`
type Messages = typeof import('./messages/en.json');
export interface IntlMessages extends Messages {
  Navlinks: {
    home?: 'Home';
    about: 'About';
    services: 'Services';
    contact: 'Contact';
  };
}