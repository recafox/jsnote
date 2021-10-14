import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  // accumulate all the code of code cells until this cell
  // cumulative bundling
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          // if this is a react JSX element
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
        root.innerHTML = value;
        }
      } 
    `;
    // var declaration can be repeatedly reassigned
    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        // show function will only work at current cell
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          // other cell will get empty function
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode.join('\n');
  });
};
