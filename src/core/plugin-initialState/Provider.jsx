import React from 'react';
import initialState from './@@initialState'

function Loading() { return <div />; }
export default function InitialStateProvider(props) {
  const appLoaded = React.useRef(false);

  const { loading = false } = initialState() || {};
  React.useEffect(() => {
    if (!loading) {
      appLoaded.current = true;
    }
  }, [loading]);
  if (loading  && !appLoaded.current ) {
    return <Loading />;
  }
  return props.children;
}
