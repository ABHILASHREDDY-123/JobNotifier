import "../styles/signIn.css";
import axios from "axios";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { GoogleLoginButton } from "react-social-login-buttons";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../auth/config";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./loader";
import { useNavigate } from "react-router-dom";

const SignIn = ({setToken}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            setLoading(true)
            const result = await signInWithPopup(auth, provider)
            const token = result.user.accessToken;
            const user = result.user;
            const res = await axios.get("http://localhost:8000/auth", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            setToken(token);
            setLoading(false);
            navigate("/companies")
        }
        catch (error) {
            setLoading(false);
            const errorMessage = error.message;
            toast.error(errorMessage, { theme: "dark" })
            console.log(errorMessage);
        }
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="signIn">
            <div className="img-box">
                <img height={"130%"} width={"auto"} src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8am9iJTIwbm90aWZpZXJ8ZW58MHx8MHx8fDA%3D"></img>
            </div>
            <div className="auth-box">
                <Card variant="outlined" sx={{ minWidth: 300, height: "129.9%" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                            Welcome to Job Notifier! 👋🏻
                        </Typography>
                        <Typography variant="h6" component="div">
                            Please sign-in to your account
                            <br />
                            &
                            <br />
                            start your job hunting....
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <GoogleLoginButton onClick={handleSignUp}></GoogleLoginButton>
                    </CardActions>
                </Card>

            </div>

        </div>

    );
}

export default SignIn;