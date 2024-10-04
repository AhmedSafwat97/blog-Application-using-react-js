import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import MailLink from "./Componants/MainLink";

// Lazy load components
const Home = lazy(() => import("./Componants/Pages/Home/Home"));
const Navbar = lazy(() => import("./Componants/Navbar/Navbar"));
const Footer = lazy(() => import("./Componants/Footer/Footer"));
const Login = lazy(() => import("./Componants/Pages/Login/Login"));
const Signup = lazy(() => import("./Componants/Pages/Login/SIgnup"));
const CreateNewpost = lazy(() => import("./Componants/Pages/CreatePost/CreateNewpost"));
const PostDetails = lazy(() => import("./Componants/Pages/Postdetails/PostDetails"));
const Editinfo = lazy(() => import("./Componants/Pages/Profile/Editinfo/Editinfo"));
const Profile = lazy(() => import("./Componants/Pages/Profile/Profile"));
const Categories = lazy(() => import("./Componants/Pages/categories/categories"));
const SearchResult = lazy(() => import("./Componants/Pages/Search/SearchResult"));
const EditPosts = lazy(() => import("./Componants/Pages/EditPosts/EditPosts"));
const Forgotpass = lazy(() => import("./Componants/Pages/Login/Forgotpass"));

function App() {
  const [Search, setSearch] = useState("");

  const queryKey = ["posts"];

  // Fetch data function
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/post`);
    return response.data;
  };

  // Use query to fetch and cache the posts data
  const { data, isLoading, isError } = useQuery(queryKey, fetchData);

  // Loading spinner component
  const LoadingSpinner = () => (
    <Box
      sx={{
        maxWidth: "1536px",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
        <Typography
          variant="h3"
          className="logo"
          sx={{ fontSize: "30px", fontWeight: "800", cursor: "pointer" }}
        >
          WriteWave
        </Typography>
      </Box>
    </Box>
  );

  return (
    <div
      className="App"
      style={{
        maxWidth: "1536px",
        margin: "0 auto",
        backgroundColor: "#0F172A",
      }}
    >
      {isLoading && <LoadingSpinner />}
      {isError && (
        <Box
          sx={{
            maxWidth: "1536px",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="error">
            Failed to load data. Please try again later.
          </Typography>
        </Box>
      )}

      {data && (
        <Router>
          {/* Suspense used to handle lazy loading components */}
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar {...{ Search, setSearch }} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<Signup />} />
              <Route path="/forgotpass" element={<Forgotpass />} />
              <Route path="/category/:id" element={<Categories />} />
              <Route path="/postDetails/:id" element={<PostDetails />} />
              <Route path="/Createnewpost" element={<CreateNewpost />} />
              <Route path="/editpost/:id" element={<EditPosts />} />
              <Route path="/Profile/:id" element={<Profile />} />
              <Route path="/editprofile/:id" element={<Editinfo />} />
              <Route
                path="/search"
                element={<SearchResult {...{ Search, setSearch }} />}
              />
            </Routes>
            <Footer />
          </Suspense>
        </Router>
      )}
    </div>
  );
}

export default App;
