'use client';

import { useUser, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from "@mui/material";
import Link from "next/link";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
    const router = useRouter();
    const { isSignedIn } = useUser();

    const handleBasicPlan = async () => {
        if (!isSignedIn) {
            alert('Please sign in to purchase the plan.');
            router.push('/sign-in');
            return;
        }
        router.push('/api/checkout_session?plan=basic');
    };

    const handleProPlan = async () => {
        if (!isSignedIn) {
            alert('Please sign in to purchase the plan.');
            router.push('/sign-in');
            return;
        }
        router.push('/api/checkout_session?plan=pro');
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        FlashMind
                    </Typography>
                    <Button color="inherit" component={Link} href="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} href="/generate">
                        Generate Flashcards
                    </Button>
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <>
                            <Button color="inherit" component={Link} href="/sign-in">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} href="/sign-up">
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {/* Pricing Section */}
            <Container sx={{ mt: 8, mb: 8 }}>
                <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
                    Pricing
                </Typography>
                <Typography variant="h6" color="textSecondary" align="center" paragraph>
                    Explore our pricing options below:
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ textAlign: 'center', boxShadow: 3, padding: 3, borderRadius: 2 }}>
                            <CardContent>
                                <AttachMoneyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Basic Plan
                                </Typography>
                                <Typography variant="h5" color="textPrimary" gutterBottom>
                                    $4.99 / month
                                </Typography>
                                <Button variant="outlined" color="primary" size="large" onClick={handleBasicPlan}>
                                    Get Basic
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ textAlign: 'center', boxShadow: 3, padding: 3, borderRadius: 2 }}>
                            <CardContent>
                                <StarIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                                <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Pro Plan
                                </Typography>
                                <Typography variant="h5" color="textPrimary" gutterBottom>
                                    $8.99 / month
                                </Typography>
                                <Button variant="contained" color="secondary" size="large" onClick={handleProPlan}>
                                    Get Pro
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ backgroundColor: '#3f51b5', color: '#fff', padding: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                    © 2024 FlashMind. All rights reserved.
                </Typography>
            </Box>
        </>
    );
}
