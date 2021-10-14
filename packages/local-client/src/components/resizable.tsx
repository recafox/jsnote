import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableProps } from "react-resizable";

interface ResizableComponentProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableComponentProps> = ({ direction, children }) => {
  let resizableProps: ResizableProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  useEffect(() => {
    let timer: any;

    const listener = () => {

      // debouncing
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    // clean up
    // execute when this component is stop being displayed on the screen or removed
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
    }
  }

  // expand in width as much as possible
  // note: react-resizable does not take width = 100%
  return (
    <ResizableBox {...resizableProps}
    >
      {children}
    </ResizableBox>
  )
};

export default Resizable;