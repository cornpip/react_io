import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ReactMarkdwon from 'react-markdown';
import {useEffect, useState} from 'react';

interface MainProps {
  // readonly posts: Promise<string>[];
  posts: string[];
  title: string;
}

export default function Main(props: MainProps) {
  console.log('mainnnnnnnnnnnnnnn');
  const { posts, title } = props;
  const [ contents, setContents ] = useState<string[]>([])

  async function getcontents(paths: string[]){
    const contents = paths.map(async (path: string)=>{
      return await fetch(path).then(res => res.text())
    })
    // console.log(contents) // Promise<string[]>
    const resolve_contents = await Promise.all(contents)
    setContents(resolve_contents)
  }

  useEffect(()=>{
    getcontents(posts)
  },[])

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {
        contents && contents.map((content)=>{
          console.log("markdown")
          return (
            <ReactMarkdwon key={content} children={content}/>
          )
        })
      }
    </Grid>
  );
}
