import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function BasicTextFields() {
    const paperStyle = { padding: '50px', width: 600, margin: "20px auto" };

    const [address, setAddress] = React.useState('');
    const [name, setName] = React.useState('');
    const [students, setStudents] = React.useState([]);


    const onchangeAddress = (e) => {
        setAddress(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const student = { name, address };
        console.log(student);

        fetch("http://localhost:5001/api/student/add",
            {
                method: `POST`,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            }).then((response) => {
                console.log(response);
            });
            
        handleClear();
        fetchData();
    }

    const handleClear = () => {
        setName('');
        setAddress('');
    }

    React.useEffect(() => {
        // fetch("http://localhost:5001/api/student/getAll")
        // .then(resp=>resp.json())
        // .then((result)=>{
        //     console.log(result);
        //     setStudents(result);
        // });
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch("http://localhost:5001/api/student/getAll");
        const json = await response.json();
        setStudents(json);
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Students</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField fullWidth id="outlined-basic" label="Student Name" variant="outlined"
                        value={name} onChange={(e) => { setName(e.target.value) }} />
                    <TextField fullWidth id="outlined-basic" label="Student Address" variant="outlined"
                        value={address} onChange={onchangeAddress} />
                    <Button onClick={handleSubmit} variant="contained" color="success">
                        Submit
                    </Button>
                    <Button onClick={handleClear} variant="outlined" color="error">
                        Clear
                    </Button>
                </Box>

            </Paper>

            <Paper elevation={3} style={paperStyle}>
                {students.map((t) => {
                    return <Paper key={t.id} elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}>
                        Id:{t.id}<br />
                        Name:{t.name}<br />
                        Address:{t.address}<br />
                    </Paper>
                })}
            </Paper>




        </Container>
    );




}