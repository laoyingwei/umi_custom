
import {Suspense,lazy} from 'react'
import {Spin} from 'antd'
import {plugin} from './plugin';
function lazyLoad(Comp) {
    return (
      <Suspense
        fallback={
          <Spin
            size='large'
            style={{{SpinStyle}}}
          />
        }
      >
        <Comp />
      </Suspense>
    )
}
export function getRoutes() {
  const routes = {{{ routes }}};

  plugin.applyPlugins({
     key: 'patchRoutes',
     args: { routes },
   });
  return routes;
}