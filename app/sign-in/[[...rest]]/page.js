import { AppBar, Container, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamically load SignIn to avoid SSR issues
const SignIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignIn), { ssr: false });

export default function SignInPage() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Flashcard SaaS
          </Typography>
          <Button color="inherit" component={Link} href="/sign-in">
            Login
          </Button>
          <Button color="inherit" component={Link} href="/sign-up">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* SignIn Section */}
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '80vh', textAlign: 'center', padding: 4 }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Sign In
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Access your account and manage your flashcards with ease.
          </Typography>
          <Box sx={{ width: '100%', mt: 4 }}>
            <SignIn routing="hash" /> {/* Added routing="hash" */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
