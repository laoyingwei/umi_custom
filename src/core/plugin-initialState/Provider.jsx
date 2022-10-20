import React from 'react';
import initialState from './@@initialState'
import { Spin } from 'antd'
function Loading() { return <div><Spin /></div>; }
export default function InitialStateProvider(props) {
  const appLoaded = React.useRef(false);

  const { loading = false } = initialState() || {};
  React.useEffect(() => {
    if (!loading) {
      appLoaded.current = true;
    }
  }, [loading]);
  if (loading && !appLoaded.current) {
    return <Loading />;
  }
  return props.children;
}
