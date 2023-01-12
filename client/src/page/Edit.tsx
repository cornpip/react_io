import { Container, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ReactMd from "../component/MarkDown/Reactmd";

function Edit() {
    const [text, setText] = useState<string>("");

    function textHandler(e: any) {
        // console.log(e.target.value);
        setText(e.target.value);
        return;
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2"> Edit Page </Typography>
                </Grid>
                <Grid item xs={6} sx={{ border: 2, borderColor: "#ff00ff", p: 2 }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        variant="filled"
                        fullWidth
                        // label="Multiline"
                        multiline
                        value={text}
                        onChange={textHandler}
                    />
                </Grid>
                <Grid item xs={6} zeroMinWidth sx={{ border: 2, borderColor: "#8000FF", p: 2 }}>
                    <ReactMd text={text} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Edit;