import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import BuildIcon from '@mui/icons-material/Build';
import  Button  from '@mui/material/Button';
const Navbar = ({ token,setToken }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };


  return (
    <div style={{ width: "100%" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", width: "250px", cursor: "pointer" }} onClick={() => { navigate("/") }} >
              <img
                alt="Search Icon"
                src="/icon.jpg"
                style={{ width: '30px', height: '30px', borderRadius: '8px', marginRight: "5%" }}
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
                onClick={()=>navigate("/")}
              >
                Job Notifier
              </Typography>
            </div>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
              {token && token.length > 0 ? (
                <>

                 <Typography variant="h6" component="div" sx={{
                   display: { xs: 'none', md: 'flex' },
                   mr: 2,
                   fontFamily: 'monospace',
                   fontWeight: 700,
                   color: 'inherit',
                   textDecoration: 'none',
                   cursor: "pointer",
                  }} onClick={()=>navigate("/test")}>
                  Test
                </Typography>

                <Typography variant="h6" component="div" sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 2,
                  ml:2,
                  marginTop:"4px",
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: "pointer"
                }} onClick={handleLogout}>
                  <LogoutIcon />
                </Typography>
                  </>
              ) : (
                <Typography variant="h6" component="a" sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }} onClick={handleLogout} >
                  <LoginIcon />
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
