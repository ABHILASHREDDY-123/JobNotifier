import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import "../styles/companies.css";
import Loader from "./loader";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const API_URL = "13.201.39.54:8000/";

const Company = ({ company, url, available, handleRemove, _id }) => {
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
                    <Button variant='contained' color='error' className='company-bnt' onClick={() => handleRemove(_id)}> Remove </Button>
                </CardActions>

            </Card>
        </div>
    );
}


const Companies = ({ token, setToken }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRemove = async (_id) => {
        try {
            const resp = await axios.delete(API_URL+`delete/${_id}`,{
                headers:{
                    Authorization:"Bearer "+token,
                    "Content-Type":"application/json"
                }
            });
            let newJobs = []
            for (let i = 0; i < jobs.length; i++) {
                if (jobs[i]._id === _id) { }
                else { newJobs.push(jobs[i]) }
            }
            setJobs(newJobs);
            toast.success("Removed successfully");
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
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
            catch (err) {
                localStorage.removeItem("job-notifier");
                setToken("");
                navigate("/login");
            }
        }
        fetchData();
    }, [])

    if (loading) {
        return (<Loader />)
    }
    return (
        <div className="companies">
            {jobs.map((e) => {
                return (
                    <Company handleRemove={handleRemove} company={e.company} url={e.url} available={e.available} _id={e._id} />
                )
            })}
        </div>
    );
}
export default Companies;