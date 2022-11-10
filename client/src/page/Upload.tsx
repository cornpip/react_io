import Button from '@mui/material/Button';
import React, { useState, useRef } from 'react';
import BasicTable from '../component/Table/BasicTable';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { border } from '@mui/system';

export default function Upload() {
    const [filesInfo, setFilesInfo] = useState<Array<Array<string | number>>>([]);
    const [filesinfoMd, setfilesinfoMd] = useState<Array<Array<string | number>>>([]);
    const [formData, setFormData] = useState(new FormData);
    const [title, setTitle] = useState("");
    const [err, setErr] = useState(false);
    const [mdborder, setmdBorder] = useState({});

    function submitHandler(e: React.PointerEvent<HTMLButtonElement>) {
        // console.log(e);
        //formdata 안에 값 getAll("프로퍼티") method로 확인가능, 그냥 console은 안나온다.
        // console.log(formData.getAll("image"));
        // console.log(formData.getAll("md"));
        if (!title) setErr(true);
        if (!formData.has("md")){
            console.log("not md");
            setmdBorder({
                border:1,
                borderColor: 'error.main',
                borderRadius: 2
            })
        }
        //data : JSON.stringify된 { ~~~~~ }
        //위의형태를 보내줘야할지, json으로 key value가 넘어가야할지는 서버에서 지정한 형식을 따른다.
        if (title && formData.has("md")) {
            formData.delete("feature_title"); //초기화
            formData.append("feature_title", title);
            fetch("http://localhost:8000/post",
                {
                    method: "Post",
                    body: formData
                })
                .then(d => console.log(d))
        }
    }
    function inputHandler(e: React.ChangeEvent<HTMLInputElement>, image: boolean) {
        const files = e.target.files;
        image ? formData.delete("image") : formData.delete("md"); //초기화
        if (files !== null) {
            const info = [];
            const fleng = files.length;
            for (let i = 0; i < fleng; i++) {
                info.push([files[i].name, files[i].type, Math.round(files[i].size / 1024)])
                image ? formData.append("image", files[i]) : formData.append("md", files[i]);
            }

            image ? setFilesInfo(info) : setfilesinfoMd(info);
            // formData는 render 요소가 아니므로 굳이 setstate 하지 않아도 된다.
        }
        // console.log(e.target.files);
    }

    function texthandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        // console.log(e);
        setTitle(e.target.value);
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Typography variant="h2"> Upload Page </Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField
                        error={err}
                        fullWidth id="filled-basic"
                        label="feature title"
                        variant="standard"
                        onChange={texthandler}>
                    </TextField>
                </Grid>
                <Grid xs={12}>
                    <Typography variant='h6' component="span">
                        Feature image
                    </Typography>
                    <Button
                        color="secondary"
                        variant='contained'
                        component="label"
                        sx={{ margin: 2 }}
                    >
                        upload
                        <input hidden multiple type="file" onChange={(e) => inputHandler(e, true)} />
                    </Button>
                    <BasicTable headrows={["fileName", "type", "size(KB)"]} rows={filesInfo} />
                </Grid>
                <Grid xs={12} sx={mdborder}>
                    <Typography variant='h6' component="span">
                        md File
                    </Typography>
                    <Button
                        color="secondary"
                        variant='contained'
                        component="label"
                        sx={{ margin: 2 }}
                    >
                        upload
                        <input hidden multiple type="file" onChange={(e) => inputHandler(e, false)} />
                    </Button>
                    <BasicTable headrows={["fileName", "type", "size(KB)"]} rows={filesinfoMd} />
                </Grid>
                <Grid xs={12}
                    sx={{ margin: 4 }}
                    container
                    // alignItems="center" 세로축
                    justifyContent="center">
                    <Button
                        size="large"
                        variant='contained'
                        color='success'
                        onClick={submitHandler}>
                        submit
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}