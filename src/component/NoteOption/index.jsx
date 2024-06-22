import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import EditNoteTitle from "../EditNote";
import { useDispatch } from "react-redux";
import { activeNote, deleteNote } from "../../service/noteService";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const FadeMenu = ({ idNote, statue }) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShowEdit = () => {
    setOpenEdit(true);
    handleClose();
  };
  const closeEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteNote = async () => {
    try {
      const result = await dispatch(deleteNote({ idNote: noteId }));
      if (deleteNote.fulfilled.match(result)) {
        handleClose();
      }
    } catch (error) {
      return error;
    }
  };
  const handleActive = async () => {
    try {
      const result = await dispatch(
        activeNote({
          active: !statue,
          idNote,
        })
      );
      if (activeNote.fulfilled.match(result)) {
        handleClose();
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <div>
      <Tooltip title="Setting">
        <SettingsIcon
          sx={{ color: "while" }}
          onClick={handleClick}
          style={{ fontSize: "18px" }}
        />
      </Tooltip>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        style={{ top: "5px", left: "-86px" }}
      >
        <MenuItem onClick={handleShowEdit} style={styles}>
          {" "}
          <EditIcon sx={{ fontSize: 20 }}></EditIcon>Edit Note
        </MenuItem>
        <MenuItem onClick={handleDeleteNote} style={styles}>
          <DeleteForeverIcon sx={{ fontSize: 20 }}></DeleteForeverIcon>Delete{" "}
        </MenuItem>
        <MenuItem onClick={handleActive} style={styles}>
          {!statue ? (
            <>
              <ClearIcon sx={{ fontSize: 20 }}></ClearIcon>
              Slacking
            </>
          ) : (
            <>
              <DoneIcon sx={{ fontSize: 20 }}></DoneIcon>
              Done
            </>
          )}
        </MenuItem>
      </Menu>
      {openEdit && (
        <EditNoteTitle
          title="Edit Title Note"
          label="Name Title"
          typeEdit="title_note"
          openEdit={openEdit}
          closeEdit={closeEdit}
        ></EditNoteTitle>
      )}
    </div>
  );
};
const styles = {
  fontSize: "16px",
  fontWeight: "500",
};
FadeMenu.propTypes = {
  idNote: PropTypes.string.isRequired,
  statue: PropTypes.bool.isRequired,
};
export default FadeMenu;
