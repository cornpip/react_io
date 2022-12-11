import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ReactMarkdwon from 'react-markdown';
import { useEffect, useState } from 'react';


// {
//   "id": 1,
//   "featureTitle": "test",
//   "mdName": "blog-post.1_1670735285127-886069199.md",
//   "created": "2022-12-11T05:08:05.167Z",
//   "updated": "2022-12-11T05:08:05.167Z",
//   "images": [
//     {
//       "id": 1,
//       "imageName": "netflix_1670735285129-992920115.png"
//     }
//   ]
// },
interface Iimage {
  id: number,
  imageName: string,
}

interface IPost {
  id: number,
  featureTitle: string,
  mdName: string,
  created: string,
  updated: string,
  images: Array<Iimage>,
}

export default function Main(props: any) {
  console.log('mainnnnnnnnnnnnnnn');
  const { title } = props;
  // const [contents, setContents] = useState<string[]>([]);
  const [posts, setPosts] = useState([]);
  const [contents, setContents] = useState<Array<string>>([]);

  async function postFile(url: string, data: object) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    return response;
  }

  async function sleep(){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        console.log("sleep finish");
        resolve("suc");
      }, 2000);
    })
  }

  // setContents를 실행하는 시점이 모든 fetch가 끝난다음이므로
  // 이 함수에서 순서 제어하는게 맞다. map fetch를 제어하기 위해 promise.all을 쓴다.
  // 여러개의 Promise를 받아오는 작업에 순서가 무관하다면 효율도 Promise.all이 옳다.
  // 최종 반환 순서는 fullfiled 들어온 순서와 상관없이 배열의 순서 지키면서 반환해준다.
  async function getContents(paths: string[]) {
    if (posts.length == 0) return;
    console.log("getContents", posts);

    try {
      const temp = await Promise.all(
        posts.map(async (post: IPost, i: number) => {
          // map요소 scope에서 await 걸어도 다음 map요소 함수로 넘어간다
          const res = postFile(`${process.env.REACT_APP_FILE}/md`, { mdName: post.mdName }).then((r) => r.text());
          return res;
        })
      )
      console.log(temp);
      setContents((prev) => {
        console.log("setContents...");
        return temp;
      });
      
    } catch (e) {
      console.log(e);
    }
  }

  async function getPosts() {
    try {
      const url = `http://localhost:8000/post/all`;
      //r.json()도 promise를 return한다.
      const res = await fetch(url).then(r => r.json()).then((r) => r)
      console.log(`TTTTT2`, res);
      setPosts(res);
    } catch (e) {
      console.log(e);
    }
  }

  // useEffect(() => {
  //   getcontents(posts);
  // }, [])

  useEffect(() => {
    getPosts();
  }, [])

  useEffect(() => {
    getContents([]);
  }, [posts])

  //contents 확인 중
  useEffect(() => {
    contents.map((c) => {
      console.log("Map.........");
    })
  }, [contents])

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
          console.log("markdown");
          return (
            <>
              <Typography variant="h2" align="center" sx={{ margin: 2 }}>
                Post Title
              </Typography>
              <ReactMarkdwon key={content} children={content} />
              <Divider />
            </>
          )
        })
      }
    </Grid>
  );
}
