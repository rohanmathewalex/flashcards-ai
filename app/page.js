import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from "@mui/material";
import Head from "next/head";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SchoolIcon from '@mui/icons-material/School';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';

export default function Home() {
  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* Navbar */}
      <AppBar position="static" style={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>

          <SignedOut>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" color="inherit">
                Login
              </Button>
              <Button variant="contained" color="secondary">
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
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            The easiest way to create flashcards from your text using AI technology. Streamline your studying and maximize your efficiency.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
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
                Keep track of what you’ve learned and what you need to review. Our system helps you monitor your progress and focus on what's important.
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
          sx={{ fontWeight: 'bold', color: '#333', marginBottom: 4 }}  // Updated to h3 and added margin
        >
          Pricing
        </Typography>
        <Typography variant="h6" color="textSecondary" align="center" paragraph>
          Whether you're just starting out or need access to advanced features, we have a plan for you. Explore our pricing options below:
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
                  $0 / month
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Get started with basic flashcard creation and access to limited features.
                </Typography>
                <Button variant="outlined" color="primary" size="large">
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
                  $7.99 / month
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Unlock all premium features, including unlimited flashcards, advanced AI capabilities, and priority support.
                </Typography>
                <Button variant="contained" color="secondary" size="large">
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
          © 2024 Flashcard SaaS. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
