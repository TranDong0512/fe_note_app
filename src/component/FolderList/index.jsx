/* eslint-disable react/prop-types */
import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteForever from "../DeleteCustom";
import { useDispatch } from "react-redux";
import { deleteFolder } from "../../service/folderService";
import ComponentAddOrEdit from "../AddFolderOrNote";
function FolderList({ folders }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const deleteF = async () => {
    try {
      const result = await dispatch(deleteFolder({ idFolder: activeFolderId }));
      if (deleteFolder.fulfilled.match(result)) {
        setActiveFolderId(folders[0].idFolder);
        navigate(`/folders/${folders[0].idFolder}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (folders && folders.length != 0) {
      setActiveFolderId(folders[0].idFolder);
      navigate(`/folders/${folders[0].idFolder}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (idFolder) => {
    if (idFolder !== activeFolderId) {
      setActiveFolderId(idFolder);
      navigate(`folders/${idFolder}`);
    }
  };
  return (
    <>
      <List
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px",
          bgcolor: "#7D9D9C",
          textAlign: "left",
          overflowY: "auto",
        }}
        subheader={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Folder
            </Typography>
            <ComponentAddOrEdit
              title="Add Folder"
              icon="folder"
              label="Name Folder"
              typeAdd="folder"
            ></ComponentAddOrEdit>
          </Box>
        }
      >
        {folders.length === 0 ? (
          <Card
            sx={{
              mb: "5px",
            }}
          >
            <CardContent
              sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                Không có thư mục nào!
              </Typography>
            </CardContent>
          </Card>
        ) : (
          folders?.map((folder) => {
            return (
              <Link
                key={folder.idFolder}
                to={`folders/${folder.idFolder}`}
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(folder.idFolder);
                }}
              >
                <Card
                  sx={{
                    mb: "5px",
                    backgroundColor:
                      folder.idFolder === activeFolderId
                        ? "rgb(255 211 140)"
                        : null,
                  }}
                >
                  <CardContent
                    sx={{
                      "&:last-child": { pb: "10px" },
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {folder.name}
                    </Typography>
                    {folder.idFolder === activeFolderId && (
                      <DeleteForever
                        title="Delete Folder"
                        deleteFolder={deleteF}
                      />
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </List>
    </>
  );
}

export default FolderList;
