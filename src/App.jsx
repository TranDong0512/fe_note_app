import { Container } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routers from "./routers";

function App() {
  return (
    <Container sx={{ textAlign: "center", marginTop: "50px" }}>
      <RouterProvider router={routers} />
    </Container>
  );
}

export default App;
