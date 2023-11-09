'use client'
import React, { useEffect, useState } from 'react';
import { CssVarsProvider, useColorScheme, } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses, } from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GoogleIcon from './googleicon';
import AuthContext from '../../authCtx';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

function ColorSchemeToggle({ onClick, ...props }) {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <IconButton size="sm" variant="plain" color="neutral" disabled />;
    }

    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="plain"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...props}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function JoySignInSideTemplate() {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const authCtx = React.useContext(AuthContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = event.currentTarget.elements;
        const body = {
            email: data.email.value,
            password: data.password.value,
            persistent: data.persistent.checked,
        };

        console.log(body);

        const response = await fetch(`/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const responseData = await response.json();

        // console.log(responseData);
        // console.log(response);

        if (response.ok) {
            if (responseData.status && (responseData.status === "fail" || responseData.status === "error")) {
                alert("invalid email or password");
                return;
            }
            else {
                authCtx.login(responseData.token, responseData.data.user);
                router.push('/dashboard');
                return;
            }

        }
        setIsLoading(false);
        let errorMessage = 'Some error occured! Try again later.';
        try {
            errorMessage = responseData.message;
        } catch (err) {
            alert(err);
            console.log(errorMessage);
        }
        alert(errorMessage);
    };

    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Collapsed-breakpoint': '769px',
                        '--Cover-width': '40vw',
                        '--Form-maxWidth': '700px',
                        '--Transition-duration': '0.4s',
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width:
                        'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(255 255 255 / 0.6)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        width:
                            'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                        maxWidth: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            fontWeight="lg"
                            startDecorator={
                                <Box
                                    component="span"
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        background: (theme) =>
                                            `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                                        borderRadius: '50%',
                                        boxShadow: (theme) => theme.shadow.md,
                                        '--joy-shadowChannel': (theme) =>
                                            theme.vars.palette.primary.mainChannel,
                                    }}
                                />
                            }
                        >
                            Logo
                        </Typography>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <div>
                            <Typography component="h1" fontSize="xl2" fontWeight="lg">
                                Sign in to your account
                            </Typography>
                            <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                                Welcome back
                            </Typography>
                        </div>
                        <form onSubmit={handleLogin}>
                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" name="password" />
                            </FormControl>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Checkbox size="sm" label="Remember for 30 days" name="persistent" />
                                <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                                    Forgot your password?
                                </Link>
                            </Box>
                            <Button type="submit" fullWidth>
                                Sign in
                            </Button>
                        </form>
                        <Button
                            type="button"
                            className="btn btn-link btn-floating-mx-1"
                            onClick={() => signIn("google")}
                            variant="outlined"
                            color="neutral"
                            fullWidth
                            startDecorator={<GoogleIcon />}
                        >
                            Sign in with Google
                            {/* <i className="fab fa-google"></i> */}
                        </Button>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © Your company {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://i0.wp.com/sportsmedicineweekly.com/wp-content/uploads/2022/04/mental1.jpeg?fit=840%2C560&ssl=1)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://media.istockphoto.com/id/1132629507/vector/running-woman-isolated-vector-silhouette-run-heathy-lifestyle.jpg?s=612x612&w=0&k=20&c=pKfzj_6zB4MKOJ2D3Nb2Mu8shQOgSiRgpCKcuHtOZjA=)',
                    },
                })}
            />
        </CssVarsProvider>
    );
}