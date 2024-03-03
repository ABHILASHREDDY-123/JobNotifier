import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import "../styles/companies.css";
import Loader from "./loader";
import Button from '@mui/material/Button';


const API_URL = "http://localhost:8000/";

const Company = ({ company, url, available, handleRemove, idx }) => {
    return (
        <div className="company">
            <Card elevation={7} className="card-company">
                <CardContent >
                    <div className="card-company-name">
                        <a href={url} style={{ color: "blue" }}>
                            {company}
                        </a>
                    </div>
                    <div className="card-company-available">
                        {available ?
                            <>
                                <img src="icons8-approval-96.png" style={{ height: "15px", marginTop: "5px", marginRight: "0.2rem" }}></img>
                                Available
                            </> :
                            <>
                                <img src="icons8-wrong-96.png" style={{ height: "15px", marginTop: "5px", marginRight: "0.2rem" }}></img>
                                Not Available
                            </>}

                    </div>
                </CardContent>
                <CardActions>
                    <Button variant='contained' color='error' className='company-bnt' onClick={() => handleRemove(idx)}> Remove </Button>
                </CardActions>

            </Card>
        </div>
    );
}


const Companies = ({ token }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRemove = (idx) => {
        let newJobs = []
        for (let i = 0; i < jobs.length; i++) {
            if (i === idx) { }
            else { newJobs.push(jobs[i]) }
        }
        setJobs(newJobs);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(API_URL + "companies", {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'Application/json'
                }
            });
            const data = res.data;
            let arr = [];
            for (let i = 0; i < data.jobs.length; i++) {
                arr.push({ ...data.jobs[i], available: data.results[i] })
            }
            console.log(arr);
            setJobs(arr);
            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) {
        return (<Loader />)
    }
    return (
        <div className="companies">
            {jobs.map((e, idx) => {
                console.log(e);
                return (
                    <Company handleRemove={handleRemove} company={e.company} url={e.url} available={e.available} idx={idx} />
                )
            })}
        </div>
    );
}
export default Companies;