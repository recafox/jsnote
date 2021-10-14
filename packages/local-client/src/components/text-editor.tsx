import './text-editor.css';
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    // if user click outside of markdown preview...
    const listener = (event: MouseEvent) => {
      // Ts does not know the type of event.target, and ref.current.contains expect a typed Node
      // tell TS this is a Node
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        // clicked inside editor
        return;
      }

      // clicked outside editor
      setEditing(false);
    }
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    }
  }, [])

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={cell.content} onChange={(val) => updateCell(cell.id, val ? val : '')}/>
      </div>
    )
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  )
}


export default TextEditor;