import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Styles
import { ColorModeContext, tokens } from '../../theme';
import { Box, Button, TextField, FormControl, Input, InputLabel, InputAdornment, IconButton, Card, Backdrop, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';
import * as BsIcons from 'react-icons/bs'; //icons
import './landingPage.css' //css

//Firebase
import { auth } from "./firebase/firebase";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

//Back-End
import axios from "axios";

function Login() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const ColorMode = useContext(ColorModeContext);

    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    let navigate = useNavigate();
    let loadData = false;

    const [loading, setLoaded] = React.useState(false);
    const loadingClose = () => {
        setLoaded(false);
    };
    const loadingToggle = () => {
        setLoaded(!loading);
    };

    const login = (event) => {
        let data = {};
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredencial) => {
            // console.log(userCredencial);
            // console.log(userCredencial.user.uid);
            loadingToggle();

            axios({
                method: "get",
                url: `https://directtable-s.onrender.com/entrar/${userCredencial.user.uid}/${userCredencial.user.email}`,
            }).then(function (response) {
                data = response.data;
                // console.log(data);
                loadData = true;

                if (loadData === true) {
                    if (data.nome != '') {
                        loadingClose();
                        navigate("/");
                    }
                }
                else {
                    userSignOutError();
                }
            })
            // .catch();
        }).catch((error) => {
            console.log(error)
            switch (error) {
                case 'auth/internal-error':
                    //campo vazio
                    break;
                case 'auth/invalid-email':
                    //email 
                    break;
                case 'auth/wrong-password':
                    //pass errada
                    break;
                case 'auth/user-not-found':
                    //campos nao coincidem
                    break;
            }
        })
    }

    const userSignOutError = () => {
        signOut(auth)
            .then(() => {
                // console.log("Erro na Autenticação!");
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Box marginTop={'70px'} sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', backgroundColor: 'transparent', marginTop: '12%', borderRadius: '20px' }}>
                <Card elevation={12} sx={{
                    "@media (max-width: 500px)": {
                        width: '100%', height: '45%', paddingTop: '10%',
                        marginTop: '10%', marginBottom: '20%'
                    },
                    "@media (min-width: 501px) and (max-width: 550px)": {
                        width: '100%', height: '58%', paddingTop: '10%',
                        marginTop: '10%', marginBottom: '20%'
                    },
                    "@media (min-width: 551px) and (max-width: 600px)": {
                        width: '100%', height: '65%', paddingTop: '10%',
                        marginTop: '10%', marginBottom: '20%'
                    },
                    "@media (min-width: 601px) and (max-width: 700px)": {
                        width: '100%', height: '75%', paddingTop: '10%',
                        marginTop: '10%', marginBottom: '20%'
                    },
                    width: '100%', height: '70%', paddingTop: '6%', paddingBottom: '5%',
                    background: theme.palette.mode == 'dark' ? 'linear-gradient(90deg, rgba(19,35,48,1) 0%, rgba(19,67,111,1) 100%)' : colors.fundo[500],
                }}>
                    <form onSubmit={login}>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
                            <div className="login" sx={{ color: colors.texto[500], }}>Autenticar</div>
                        </Box>
                        <Box sx={{
                            display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', marginTop: '20px',
                            "@media (max-width: 700px)": {
                                marginTop: '30px'
                            },
                        }}>
                            <TextField className='login-form email'
                                id="standard-basic" label="Email"
                                variant="standard" size='small'
                                type='email'
                                fullWidth
                                value={email} onChange={handleChangeEmail}
                                sx={{
                                    display: 'block',
                                    color: colors.texto[500],
                                    width: '60%',
                                    "@media (max-width: 700px)": {
                                        width: '90%', marginBottom: '20px'
                                    },
                                    '.css-v4u5dn-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                                        borderColor: colors.projectColor[400],
                                    },
                                    '.css-pis9hk-MuiInputBase-root-MuiInput-root:after': {
                                        borderColor: colors.projectColor[400],
                                    },
                                    '.css-jnnbhv-MuiInputBase-root-MuiInput-root:after': {
                                        borderColor: colors.projectColor[400],
                                    },
                                    '.css-v4u5dn-MuiInputBase-root-MuiInput-root:after': {
                                        borderColor: colors.projectColor[400],
                                    },
                                    '.css-uq2l8v-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                        color: colors.projectColor[400],
                                    },
                                    '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                        color: colors.projectColor[400],
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', marginTop: '20px' }}>
                            <FormControl size="small" variant="standard" className='login-form password' type='password' sx={{
                                display: 'block',
                                color: colors.icons[500],
                                width: '60%',
                                "@media (max-width: 700px)": {
                                    width: '90%',
                                },
                                '.css-v4u5dn-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                                    borderColor: colors.projectColor[400],
                                },
                                '.css-pis9hk-MuiInputBase-root-MuiInput-root:after': {
                                    borderColor: colors.projectColor[400],
                                },
                                '.css-v4u5dn-MuiInputBase-root-MuiInput-root:after': {
                                    borderColor: colors.projectColor[400],
                                },
                                '.css-1ntcvzi-MuiInputBase-root-MuiInput-root:after': {
                                    borderColor: colors.projectColor[400],
                                },
                                '.css-uq2l8v-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                    color: colors.projectColor[400],
                                },
                                '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                    color: colors.projectColor[400],
                                }
                            }}>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    sx={{
                                        width: '100%',
                                    }}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                sx={theme.palette.mode == 'light' ? {
                                                    ':hover': {
                                                        color: colors.projectColor[400],
                                                    }
                                                } : {

                                                }
                                                }
                                            >
                                                {showPassword ? <BsIcons.BsEyeSlash /> : <BsIcons.BsEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{
                            "@media (max-width: 700px)": {
                                display: 'flex', flexWrap: 'nowrap', justifyContent: 'center',
                                marginTop: '10px',
                                marginRight: 0,
                            },
                            display: 'flex', flexWrap: 'nowrap', justifyContent: 'end',
                            marginRight: '19%', marginTop: '5px'
                        }}>
                            <Button variant="text" type='text' sx={{ textDecoration: 'underline', fontSize: '12px' }}>Esqueceu-se da palavra-passe?</Button>
                        </Box>
                        <Box sx={{
                            display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', marginTop: '3%',
                            "@media (max-width: 500px)": {
                                marginTop: '10%'
                            },
                            "@media (min-width: 501px) and (max-width: 600px)": {
                                marginTop: '8%'
                            },
                            "@media (min-width: 601px) and (max-width: 700px)": {
                                marginTop: '10%'
                            },
                        }}>
                            <Button variant="submit" type='submit' sx={{
                                fontWeight: 'bolder',
                                fontSize: '15px',
                                padding: '4px 6px',
                                ':hover': {
                                    color: colors.projectColor[400],
                                }
                            }}>Entrar</Button>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={loading}
                            >
                                <CircularProgress />
                            </Backdrop>
                        </Box>
                    </form>
                </Card>
            </Box >
        </>
    )
}

export default Login