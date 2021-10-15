import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
import axios from 'axios';
import './index.css';
import HelpModal from './components/help-modal';
import { useActions } from './hooks/use-actions';
const App = () => {
  const { toggleModal } = useActions();

  const download = async () => {
    axios({
      url: '/download',
      method: 'GET',
      responseType: 'blob'
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'notebook.js');
      document.body.appendChild(link);
      link.click();
    })
  };


  return (
      <div>
        <HelpModal />
        <div className="util-panel">
          <button className="button is-primary is-small download-btn" onClick={() => { download() }}>Download</button>
          <button className="button is-primary is-small" onClick={() => { toggleModal(true) }}>Help</button>
        </div>
        <CellList/>
      </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
)