import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";
import { createNamedExports } from "typescript";

interface MainProps {
  // readonly posts: Promise<string>[];
  posts: string[];
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;
  console.log("mainnnnnnnnnnnnnnn");
  const test = <h1> TEST~~ </h1>;
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts &&
        posts.map((post) => (
          <Markdown className="markdown" key={post.substring(20, 30)} path={post}>
            {post}
          </Markdown>
        ))}
    </Grid>
  );
}
