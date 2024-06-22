import { Box, Grid, Typography } from "@mui/material";
import UserMenu from "../component/UserMenu/Index";
import FolderList from "../component/FolderList";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { folders } = useSelector((state) => state.folders);

  return (
    <>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        <UserMenu />
      </Box>
      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList folders={folders}></FolderList>
        </Grid>

        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
