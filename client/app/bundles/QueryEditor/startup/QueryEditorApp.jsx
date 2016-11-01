import React from 'react';
import ReactOnRails from 'react-on-rails';

import QueryEditor from '../containers/QueryEditor';

const QueryEditorApp = (props) => (
  <QueryEditor {...props} />
);

ReactOnRails.register({ QueryEditorApp });
