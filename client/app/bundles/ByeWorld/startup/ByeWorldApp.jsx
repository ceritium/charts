import React from 'react';
import ReactOnRails from 'react-on-rails';

import ByeWorld from '../containers/ByeWorld';

const ByeWorldApp = (props) => (
  <ByeWorld {...props} />
);

// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ ByeWorldApp });
