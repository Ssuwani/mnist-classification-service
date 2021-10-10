import * as React from 'react';
import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function App() {
  const [img, setImg] = useState([]);
  const [imgurl, setImgurl] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setImg(e.target.files[0]);
    setImgurl(URL.createObjectURL(e.target.files[0]))
    setResult('');
  }
  const onClick = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', img);
    // 서버의 upload API 호출
    const res = await axios.post("http://localhost:5000/prediction", formData);
    setResult(res.data.class_name)
    console.log(res)
    setLoading(false);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          MNIST Classification
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Input your handwriting number image'}
        </Typography>

        <Button
          variant="contained"
          component="label"
          sx={{ mt: 5 }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={onChange}
          />
        </Button>
        <Typography sx={{ mt: 2 }}>
          Image Preview
        </Typography>
        <Paper variant="outlined" sx={{ y: 10 }}>
          <img src={imgurl} height={100} />
        </Paper>
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 5 }}
          onClick={onClick}
        >
          Get Prediction

        </Button>
        <Typography sx={{ mt: 2 }}>
          Result
        </Typography>
        <Paper variant="outlined" sx={{ y: 10 }}>

          <Typography style={{ color: "#00adb5" }}>Prediction: {result}</Typography>

        </Paper>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            코드는 아래의 사이트에서 확인할 수 있습니다!
          </Typography>
          <Link color="inherit" href="https://github.com/ssuwani/mnist-classification">
            mnist-classification
          </Link>{' '}
        </Container>
      </Box>
    </Box>
  );
}
