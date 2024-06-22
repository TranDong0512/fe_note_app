import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { addFolder } from "../../service/folderService";
import { addNote } from "../../service/noteService";
import { useParams } from "react-router-dom";

const ComponentAddOrEdit = ({ title, icon, label, typeAdd }) => {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [open, setOpen] = useState(false);
  const textFieldRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
    setNewName("");
  };

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleAddNew = async () => {
    if (newName === "") return;
    if (typeAdd === "folder") {
      const result = await dispatch(addFolder({ name: newName }));
      if (addFolder.fulfilled.match(result)) {
        setOpen(false);
        setNewName("");
      }
      if (addFolder.rejected.match(result)) {
        toast.error("Folder with this name already exists");
      }
    }
    if (typeAdd === "note") {
      const result = await dispatch(
        addNote({ title: newName, idFolder: folderId })
      );
      if (addNote.fulfilled.match(result)) {
        setOpen(false);
        setNewName("");
      }
      if (addNote.rejected.match(result)) {
        toast.error("Note with this name already exists");
      }
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (textFieldRef.current) {
          textFieldRef.current.focus();
        }
      }, 0);
    }
  }, [open]);
  return (
    <>
      <Tooltip title={title} onClick={handleOpenPopup}>
        <IconButton size="small">
          {icon === "folder" ? (
            <CreateNewFolderIcon sx={{ color: "white" }} />
          ) : icon === "note" ? (
            <NoteAddIcon sx={{ color: "black" }} />
          ) : (
            <></>
          )}
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={textFieldRef}
            autoFocus={true}
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
          <Button onClick={() => handleAddNew(typeAdd)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ComponentAddOrEdit.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  typeAdd: PropTypes.string.isRequired,
};

export default ComponentAddOrEdit;
