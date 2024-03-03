import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios';
import "../styles/test.css";
import { FormControl, InputLabel, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/";

function DisplayJsonData({ jsonData }) {
    return (
        <Paper style={{ maxHeight: "28rem", minHeight: "20rem", overflow: "auto", paddingLeft: "1rem" }} >
            <h2 > Result Type {typeof jsonData}</h2>
            <ul>
                {
                    Object.keys(jsonData).map(key => (
                        <li key={key}>
                            <strong>{key}:</strong> {typeof jsonData[key]}
                        </li>
                    ))}

            </ul>
        </Paper>
    );
}

const Test = ({token}) => {
    // const token = "";
    const [property, setProperty] = useState("");
    const [properties, setProperties] = useState([]);
    const [type, setType] = useState("");
    const [url, setURL] = useState("");
    const [resp, setResp] = useState("");
    const [company, setCompany] = useState("");

    const handleProperty = (e) => {
        setProperty(e.target.value);
    }

    const handleConfirm = () => {
        setProperties([...properties, property]);
        setType("");
        setProperty("");
    }
    const handleRemove = () => {
        setProperty(properties[properties.length - 1])
        let x = properties
        x.pop()
        setProperties(x);
        setType("Object");
    }

    const handleAdd = async () => {
        try {
            const res = await axios.post(API_URL + "add", { company,properties, url },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                });
            toast.success("Added to Your Account");
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    const handleTest = async () => {
        try {
            const resp = await axios.post(API_URL + "test",
                {
                    url
                }
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
            let d = resp.data;
            for (let i = 0; i < properties.length; i++) {
                d = d[properties[i]]
            }
            console.log(d)
            setResp(d);
            toast.success("Test passed")
        }
        catch (err) {
            toast.error(err.message);
        }


    }

    return (
        <div className='test'>
            <Card className='card-test' elevation={5}>
                <CardContent>
                    <TextField
                        className='company-name'
                        id="outlined-basic"
                        label="Company Name"
                        variant="outlined"
                        color="primary"
                        style={{ width: "84%", marginBottom: "1.5rem" }}
                        maxRows={1}
                        onChange={(e) => {
                            setCompany(e.target.value);
                        }}
                        value={company}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Api url"
                        variant="outlined"
                        color="primary"
                        style={{ width: "84%" }}
                        multiline
                        maxRows={1}
                        onChange={(e) => {
                            setURL(e.target.value);
                        }}
                        value={url}
                    />
                </CardContent>
                <CardActions>
                    <div className='card-action'>

                        {properties.map((e, i) => {
                            return (
                                <FormControl fullWidth style={{ display: "flow" }}>
                                    <div className='select-params'>
                                        <InputLabel id={`demo-simple-select-label-` + i}>Result Type</InputLabel>
                                        <Select
                                            labelId={`demo-simple-select-label-` + i}
                                            id="demo-simple-select"
                                            label="Result Type"
                                            value={"Object"}
                                            style={{ width: "140px", marginRight: "2rem" }}
                                        >
                                            <MenuItem value={"Object"}>Object</MenuItem>
                                        </Select>
                                        <TextField className='test-propertyField' placeholder='property name' value={e} onChange={handleProperty} />
                                        <br />
                                    </div>
                                </FormControl>
                            )
                        })}
                        <FormControl fullWidth style={{ display: "flow" }}>
                            <div className='select-params'>
                                <InputLabel id="demo-simple-select-label">Result Type</InputLabel>
                                <Select
                                    labelId={`demo-simple-select-label-`}
                                    id="demo-simple-select"
                                    label="Result Type"
                                    value={type}
                                    defaultValue={"Object"}
                                    style={{ width: "140px", marginRight: "2rem" }}
                                    onChange={(e) => { setType(e.target.value) }}
                                >
                                    <MenuItem value={"Object"}>Object</MenuItem>
                                    <MenuItem value={"Array"}>Array</MenuItem>
                                </Select>
                                {type == "Object" ? <TextField className='test-propertyField' placeholder='property name' value={property} onChange={handleProperty} /> : <></>}
                                {type == "Object" ? <Button variant="contained" className="btn btn-primary" style={{ marginLeft: "2rem" }} onClick={handleConfirm}>Confirm</Button> : <></>}
                                {type == "Array" ? <Button variant="contained" className="btn btn-danger" style={{ marginLeft: "2rem" }} onClick={handleRemove}>Remove</Button> : <></>}

                            </div>
                        </FormControl>
                        <FormControl fullWidth style={{ display: "flow" }}>
                            <Button variant='contained' className='select-params' onClick={handleTest}> Test </Button>
                            <Button variant='contained' className='add-params' style={{ marginLeft: "30rem" }} onClick={handleAdd}> Add </Button>
                        </FormControl>
                    </div>
                </CardActions>
            </Card>
            <Card className='resp-card' elevation={5}>
                <DisplayJsonData jsonData={resp} />
            </Card>
        </div>
    )
}
export default Test;