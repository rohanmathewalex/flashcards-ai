import { AppBar, Container, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamically load SignUp to avoid SSR issues
const SignUp = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignUp), { ssr: false });

export default function SignUpPage() {
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
            FlashMind
          </Typography>
          <Button color="inherit" component={Link} href="/sign-in">
            Login
          </Button>
          <Button color="inherit" component={Link} href="/sign-up">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* SignUp Section */}
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '80vh', textAlign: 'center', padding: 4 }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Create your account and start managing your flashcards with ease.
          </Typography>
          <Box sx={{ width: '100%', mt: 4 }}>
            <SignUp routing="hash" forceRedirectUrl="/generate" /> {/* SignUp component with hash-based routing */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
