import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ReactMarkdwon from 'react-markdown';
import { useEffect, useState } from 'react';

interface MainProps {
  posts: string[];
  title: string;
}

export default function Main(props: MainProps) {
  console.log('mainnnnnnnnnnnnnnn');
  const { posts, title } = props;
  const [contents, setContents] = useState<string[]>([])

  async function getcontents(paths: string[]) {
    //참고) err처리 고려해보자.
    //없는 파일이여도 ok고 text()는 html template을 retun한다.
    try{
      const contents = paths.map(async (path: string) => {
        const res = await fetch(path);
        console.log(res)
          if (!res.ok)
            throw new Error(res.statusText);
          return res.text();
      })

      // console.log(contents) // Promise<string[]>
      const resolve_contents = await Promise.all(contents)
      setContents(resolve_contents)
    }catch(e){
      console.log(e)
    }
    // 참고) Promise.all
    // 처리는 병렬로 처리하며 순차적이지 않으나 반환되는 처리 순서는 보장한다.
    // 즉 첫 번째 promise가 가장 나중에 fulfilled 상태가 되어도 첫 번째 프로미스의 resolve를 먼저 반환한다.
  }

  useEffect(() => {
    getcontents(posts)
  }, [])

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
        contents && contents.map((content) => {
          console.log("markdown")
          return (
            <ReactMarkdwon key={content} children={content} />
          )
        })
      }
    </Grid>
  );
}
