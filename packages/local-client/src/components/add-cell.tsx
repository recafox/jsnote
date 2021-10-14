import './add-cell.css';
import { useActions } from '../hooks/use-actions';

// this cell will be insert **before** cell with nextCellId
interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean; // optional, default to false
}

const AddCell: React.FC<AddCellProps>= ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  )
}

export default AddCell;