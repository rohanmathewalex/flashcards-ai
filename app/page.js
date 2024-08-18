import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import Head from "next/head";

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

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* Your main content goes here */}
        <Typography variant="body1">
          Welcome to Flashcard SaaS!
        </Typography>
      </Container>
    </>
  );
}
