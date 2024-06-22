import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";

function DeleteForever({ title, deleteFolder }) {
  const [open, setOpen] = useState(false);
  const handleOpenPopup = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = async () => {
    try {
      await deleteFolder();
      setOpen(false);
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };
  return (
    <>
      <Tooltip title={title} onClick={handleOpenPopup}>
        <IconButton size="small">
          <DeleteForeverIcon sx={{ color: "ivory" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAction}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteForever.propTypes = {
  title: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
};

export default DeleteForever;
