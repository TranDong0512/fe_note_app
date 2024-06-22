import { Box, Card, CardContent, Grid, List, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { listNote } from "../../service/noteService";
import ComponentAddOrEdit from "../AddFolderOrNote";
import NotesOption from "../NoteOption";

function NoteList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId, noteId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { notes } = useSelector((state) => state.notes);
  useEffect(() => {
    dispatch(listNote(folderId));
  }, [dispatch, folderId]);

  useEffect(() => {
    if (notes.length === 0) {
      setActiveNoteId(null);
      navigate(`/folders/${folderId}`);
    } else if (notes && notes.length !== 0) {
      navigate(`notes/${notes[0].idNote}`);
      setActiveNoteId(notes[0].idNote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const handleNoteClick = (idNote) => {
    if (idNote !== activeNoteId) {
      setActiveNoteId(idNote);
      navigate(`notes/${idNote}`);
    }
  };

  return (
    <Grid container height={"100%"}>
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: 360,
          height: "100%",
          bgcolor: "#F0EBE3",
          padding: "10px",
          textAlign: "left",
          overflowY: "auto",
        }}
      >
        <List
          subheader={
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#000" }}
              >
                Notes
              </Typography>
              <ComponentAddOrEdit
                title="Add Note"
                icon="note"
                label="Name Note"
                typeAdd="note"
              ></ComponentAddOrEdit>
            </Box>
          }
        >
          {notes.length === 0 ? (
            <Card
              sx={{
                mb: "5px",
              }}
            >
              <CardContent
                sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  Không có ghi chú nào!
                </Typography>
              </CardContent>
            </Card>
          ) : (
            notes.map(({ idNote, title, statue, updatedAt }) => {
              let backgroundColor;

              if (idNote === activeNoteId) {
                backgroundColor = "rgb(255 211 140)";
              } else if (statue) {
                backgroundColor = "rgb(200 255 200)";
              }
              return (
                <Link
                  to={`notes/${idNote}`}
                  key={idNote}
                  style={{ textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNoteClick(idNote);
                  }}
                >
                  <Card
                    sx={{
                      mb: "5px",
                      backgroundColor: backgroundColor,
                    }}
                  >
                    <CardContent
                      sx={{
                        "&:last-child": { pb: "4px" },
                        padding: "4px 10px  4px 10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          style={{ fontSize: 16, fontWeight: "bold" }}
                        >
                          {title}
                        </Typography>

                        {idNote === activeNoteId && (
                          <NotesOption
                            idNote={idNote}
                            statue={statue}
                          ></NotesOption>
                        )}
                      </div>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          paddingBottom: "0px",
                          fontWeight: 500,
                        }}
                      >
                        {moment(updatedAt).format("MMMM DD YYYY, h:mm:ss a")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default NoteList;
