import React from 'react';
import {useLocation} from 'react-router-dom'

function ErrorPages() {
  let location = useLocation();
  return (
    <div>
      404
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default ErrorPages;