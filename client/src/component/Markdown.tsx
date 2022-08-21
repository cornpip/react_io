import ReactMarkdwon2 from 'react-markdown';
import {useEffect, useState} from 'react';

export default function Markdown(props: any) {
  const { path } = props
  console.log("markdownnnnnnnnnnnn")
  const [post, setPost] = useState<any>();
  useEffect(()=>{
    const getmd = async (path: string)=>{
      var a = await fetch(path).then(res => res.text());
      setPost(a);
    }
    getmd(path)
  },[])
  // return <ReactMarkdown options={options} {...props} />;
  return <ReactMarkdwon2 children={post}/>
}