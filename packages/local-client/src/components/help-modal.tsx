import './help-modal.css';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';
const HelpModal: React.FC = () => {
  const { toggleModal } = useActions();
  const status = useTypedSelector(state => state.modal.isOpen);
  
  return (
    <div className={`modal ${status ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <section className="content">
              <h2 className="title">JSNote</h2>
              <p>
                This is an <strong>interactive</strong> coding enviroment. You can write some notes about React and more.
              </p>
              <ul>
                <li>
                  Click any text cell to edit it
                </li>
                <li>
                  The code in each code editor is all joined together into one single file
                </li>
                <li>
                  You can use a special method "show" to show any React component, string, number, or any HTML element
                </li>
                <li>
                Re-order or delete cells using the buttons on the top right panel
                </li>
                <li>
                Add new cell by clicking on the buttons on the divider between each cell
                </li>
                <li>
                  Download your note by clicking "Download" button on the top left panel
                </li>
              </ul>
              <p>
                Enjoy!
              </p>
            </section>
          </div>
        </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => {
        toggleModal(false);
      }}></button>
    </div>
  )
};

export default HelpModal;