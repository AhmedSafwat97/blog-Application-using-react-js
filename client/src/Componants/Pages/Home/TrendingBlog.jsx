import { Box, Typography } from "@mui/material";
import React from "react";
import BlogCard from "./BlogCard";
import PopularPost from "./PopularPost";
import LatestComment from "./LatestComments";


const TrendingBlog = () => {

  return (
    <Box className="container" sx={{display : "flex" , flexDirection : "column" , alignItems : "center" ,justifyContent : "center" , mb : "30px"}}>
      <Box sx={{ textAlign: "center" ,  width : "75%" , m : "20px 0 40px 0"}}>
          <Typography variant="h4" sx={{ color: "#0DBADE" }}>
            Featured Articles
          </Typography>
          <Typography sx={{ color: "gray" }}>
            Discover the most outstanding articles in all topics
          </Typography>
        </Box>
       <Box className="row">
        <Box className="col-md-8 col-sm-12">
        <BlogCard />
        </Box>
         <Box className="col-md-4" sx={{display : {xs : "none" , md : "block"}}}>
         <PopularPost/>
         <LatestComment/>
         </Box>
       </Box>
    </Box>
  );
};

export default TrendingBlog;
