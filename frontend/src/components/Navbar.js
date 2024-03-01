import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {

  const navigate = useNavigate();
  const token = "";

  const handleLogout =  () => {
    navigate("/login");
  };

  return (
    <div  style={{width:"100%"}}>
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{display:"flex",width:"250px",cursor:"pointer"}} onClick={()=>{navigate("/chat")}} >
          <img
          alt="Search Icon"
          src="/icon.jpg"
          style={{ width: '30px', height: '30px', borderRadius: '8px',marginRight:"5%" }}
        />
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            Job Notifier 
            </Typography>
            </div>
        <div >
        {token && token.length > 0 ? (
          <Typography variant="h6" component="div" sx={{
            display: { xs: 'none', md: 'flex'},
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            cursor:"pointer"
          }} onClick={handleLogout}>
            <LogoutIcon/>
        </Typography>
        ) : (
          <Typography variant="h6" component="a" sx={{
            display: { xs: 'none', md: 'flex'},
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            cursor:'pointer'
          }} onClick={handleLogout} >
            <LoginIcon/>
        </Typography>
        )}
        </div> 
        </Toolbar>
        </Container>
     </AppBar>
    </div>
  );
};

export default Navbar;
