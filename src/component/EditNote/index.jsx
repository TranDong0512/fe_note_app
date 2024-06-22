import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editTitleNote } from "../../service/noteService";
const EditNoteTitle = ({ title, label, typeEdit, openEdit, closeEdit }) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  console.log(noteId);
  const [newName, setNewName] = useState("");
  const [open] = useState(openEdit);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleClose = () => {
    closeEdit();
    setNewName("");
  };
  const handleEdit = async () => {
    if (newName === "") return;
    if (typeEdit === "title_note") {
      try {
        const result = await dispatch(
          editTitleNote({ newTitle: newName, idNote: noteId })
        );
        if (editTitleNote.fulfilled.match(result)) {
          closeEdit();
          setNewName("");
        }
      } catch (error) {
        return error;
      }
    }
  };
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={label}
          fullWidth
          variant="standard"
          size="small"
          autoComplete="off"
          sx={{ width: "400px" }}
          value={newName}
          onChange={handleNewName}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleEdit(typeEdit)}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

EditNoteTitle.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  typeEdit: PropTypes.string.isRequired,
  openEdit: PropTypes.bool,
  closeEdit: PropTypes.func,
};
export default EditNoteTitle;
