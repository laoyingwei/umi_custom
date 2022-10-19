import React from 'react';
import Provider from './Provider';
export function dataflowProvider(container) {
  return <Provider>{ container }</Provider>;
}
