import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useDebounce from "../../debounce";
import { updateContentNote } from "../../service/noteService";

function NoteDetail() {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const notes = useSelector((state) => state.notes.notes);
  const note = Array.isArray(notes)
    ? notes.find((note) => note.idNote === noteId)
    : null;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rawHTML, setRawHTML] = useState("");

  useEffect(() => {
    if (note) {
      const blocksFromHtml = convertFromHTML(note.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [note]);

  const debouncedHTML = useDebounce(rawHTML, 1000);

  useEffect(() => {
    if (debouncedHTML) {
      console.log(1111111111);
      try {
        const update = async () => {
          await dispatch(
            updateContentNote({ idNote: noteId, content: rawHTML })
          );
        };
        update();
      } catch (error) {
        return error;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedHTML]);

  const handleOnChange = (e) => {
    const updatedContent = draftToHtml(convertToRaw(e.getCurrentContent()));
    setEditorState(e);
    setRawHTML(updatedContent);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something"
    />
  );
}

export default NoteDetail;
