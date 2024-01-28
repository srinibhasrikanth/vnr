import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
  const token = storedAuth.token;
  const [isHovered, setIsHovered] = useState([false, false]);

  const handleAdd = () => {
    navigate(`/add-course/${token}`);
  };

  const handleInstructor = () => {
    navigate(`/add-instructor/${token}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Logo and Text "VNRVJIET" on the left */}
            <Grid
              item
              container
              alignItems="center"
              spacing={2}
              className="flex"
            >
              <Grid item>
                <img
                  src="/images/vnrlogo.png"
                  alt="Logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "8px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ color: "black" }}>
                  VNRVJIET
                </Typography>
              </Grid>

              <Grid item container xs={10} justifyContent="flex-end">
                {auth?.token ? (
                  <>
                    {auth?.user?.user?.role === "1" ? (
                      <>
                        <Button
                          color="inherit"
                          style={{ color: "black" }}
                          onClick={handleAdd}
                        >
                          Add Course
                        </Button>

                        <Button
                          color="inherit"
                          style={{ color: "black" }}
                          onClick={handleInstructor}
                        >
                          Add Instructor
                        </Button>
                      </>
                    ) : null}
                    <Button variant="outlined" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      variant={isHovered[0] ? "contained" : "outlined"}
                      onMouseEnter={() => setIsHovered([true, false])}
                      onMouseLeave={() => setIsHovered([false, false])}

                      //sx={{ color: isHovered ? "white" : "initial" }}
                      //   className="px-4 py-2 transition-transform transform hover:scale-110 hover:text-white"
                      //className={`${isHovered ?" text-white" : ""}`}
                    >
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Login
                      </Link>
                    </Button>

                    <Button
                      variant={isHovered[1] ? "contained" : "outlined"}
                      onMouseEnter={() => setIsHovered([false, true])}
                      onMouseLeave={() => setIsHovered([false, false])}

                      //sx={{ color: isHovered ? "white" : "initial" }}
                      //   className="px-4 py-2 transition-transform transform hover:scale-110 hover:text-white"
                      //className={`${isHovered ?" text-white" : ""}`}
                    >
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Signup
                      </Link>
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
