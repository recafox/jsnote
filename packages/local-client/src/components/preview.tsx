import { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        const handlerError = (error) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color:red"><h4>Runtime Error</h4>' + error + '</div>';
          throw error;
        }
        window.addEventListener("error", (event) => {
          event.preventDefault();
          handlerError(event.error);
        });
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (error) {
            handlerError(error);
          }
        }, false);
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // refresh iframe before bundling
    iframe.current.srcdoc = html;

    // give browser some time to update to latest html
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe
        title="code preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}>
      </iframe>
      {err && <div className="preview-error">{err}</div>}
    </div>
    );
};

export default Preview;