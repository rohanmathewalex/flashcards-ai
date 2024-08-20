'use client';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from "@mui/material";
import Link from "next/link"; // Import Next.js Link component for navigation
import Head from "next/head";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SchoolIcon from '@mui/icons-material/School';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import getStripe from "@/utils/get-stripe";


export default function Home() {
  // const handleSubmit = async () => {
  //   const checkoutSession = await fetch('/api/checkout_session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       origin: 'http://localhost:3000'
  //     },
  //   })

  //   const checkoutSessionJson = await checkoutSession.json()
  //   if (checkoutSession.statusCode === 500) {
  //     console.log(error(checkoutSession.message))
  //     return
  //   }

  //   const stripe = await getStripe()
  //   const { error } = await stripe.redirectToCheckout({
  //     sessionId: checkoutSessionJson.id,
  //   })
  //   if (error) {
  //     console.warn(error.message)
  //   }
  // }
  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.statusCode === 500) {
        console.error("Error:", checkoutSession.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn("Stripe error:", error.message);
      }
    } catch (err) {
      console.error("Failed to create checkout session", err);
    }
  };

  return (
    <>
      <Head>
        <title>FlashMind</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* Navbar */}
      <AppBar position="static" style={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            FlashMind
          </Typography>

          <SignedOut>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" color="inherit" component={Link} href="/sign-in">
                Login
              </Button>
              <Button variant="contained" color="secondary" component={Link} href="/sign-up">
                Sign Up
              </Button>
            </Box>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#e3f2fd',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 4,
          boxShadow: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#333', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            Welcome to FlashMind
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            The easiest way to create flashcards from your text using AI technology. Streamline your studying and maximize your efficiency.
          </Typography>
          <Button component={Link} href="/sign-in" variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Main Features Section */}
      <Container sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', boxShadow: 3, padding: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
              <FlashOnIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                AI-Powered Flashcards
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Automatically generate flashcards from your notes and text. Let AI do the heavy lifting so you can focus on studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', boxShadow: 3, padding: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
              <SchoolIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Smart Study Guides
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Organize and create study guides that fit your needs. Stay on top of your learning objectives with ease.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', boxShadow: 3, padding: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
              <TrackChangesIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Track Your Progress
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Keep track of what you&apos;ve learned and what you need to review. Our system helps you monitor your progress and focus on what&apos;s important.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Container sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333', marginBottom: 4 }}
        >
          Pricing
        </Typography>
        <Typography variant="h6" color="textSecondary" align="center" paragraph>
          Whether you&apos;re just starting out or need access to advanced features, we have a plan for you. Explore our pricing options below:
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
                <Typography variant="body1" color="textSecondary" paragraph>
                  Get started with basic flashcard creation and access to limited features.
                </Typography>
                {/* Link to Sign Up Page */}
                <Button variant="outlined" color="primary" size="large" component={Link} href="/sign-up">
                  Sign Up
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', boxShadow: 3, padding: 3, borderRadius: 2 }}>
              <CardContent>
                <StarIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Premium Plan
                </Typography>
                <Typography variant="h5" color="textPrimary" gutterBottom>
                  $8.99 / month
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Unlock all premium features, including unlimited flashcards, advanced AI capabilities, and priority support.
                </Typography>
                {/* Link to Sign Up Page */}
                <Button variant="contained" color="secondary" size="large" onClick={handleSubmit} >
                  Get Premium
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
