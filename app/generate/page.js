'use client'

import { useUser } from "@clerk/nextjs";
import { Container, TextField, Typography, Box, Paper, Button, Modal, IconButton, AppBar, Toolbar, Grid, CardActionArea, CardContent, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from "@mui/material"; // Added Grid here
import { useState } from "react";
import { useRouter } from "next/navigation";
import SaveIcon from '@mui/icons-material/Save';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import CloseIcon from '@mui/icons-material/Close';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setFlashcards(data));
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashCards = async () => {
        // Save flashcards logic
    };

    return (
        <>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                        Generate Flashcards
                    </Typography>

                    <Paper sx={{ p: 4, width: "100%", textAlign: 'center', boxShadow: 3 }}>
                        <TextField
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            label="Enter text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{
                                mb: 2,
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FlipCameraAndroidIcon />}
                            onClick={handleSubmit}
                            sx={{ mt: 2 }}
                        >
                            Generate Flashcards
                        </Button>
                    </Paper>
                </Box>

                <Box sx={{ mt: 4 }}>
                    {flashcards.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5">Flashcard Preview</Typography>
                            <Grid container spacing={3}>
                                {flashcards.map((flashcard, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <CardActionArea onClick={() => handleCardClick(index)}>
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        perspective: '1000px',
                                                        '& > div': {
                                                            transition: 'transform 0.6s',
                                                            transformStyle: 'preserve-3d',
                                                            position: 'relative',
                                                            width: '100%',
                                                            height: '200px',
                                                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                            transform: flipped[index]
                                                                ? 'rotateY(180deg)'
                                                                : 'rotateY(0deg)',
                                                        },
                                                        '& > div > div': {
                                                            position: 'absolute',
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: "hidden",
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 2,
                                                            boxSizing: 'border-box'
                                                        },
                                                        '& > div > div:nth-of-type(2)': {
                                                            transform: 'rotateY(180deg)',
                                                        },
                                                    }}
                                                >
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Box>

                {/* Save Flashcards Modal */}
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<SaveIcon />}
                        onClick={handleOpen}
                    >
                        Save Flashcards
                    </Button>
                </Box>

                <Modal
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Paper sx={{ p: 4, width: '100%', maxWidth: 500, textAlign: 'center', position: 'relative' }}>
                        <IconButton
                            sx={{ position: 'absolute', top: 10, right: 10 }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" gutterBottom>
                            Save Flashcards
                        </Typography>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Collection Name"
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={saveFlashCards}
                            fullWidth
                        >
                            Save
                        </Button>
                    </Paper>
                </Modal>

                {/* Save Dialog */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your flashcards collection.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin='dense'
                            label="Collection Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={saveFlashCards}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>

            {/* Footer */}
            <Box sx={{ backgroundColor: '#3f51b5', color: '#fff', padding: 2, textAlign: 'center', mt: 4 }}>
                <Typography variant="body2">
                    © 2024 Flashcard SaaS. All rights reserved.
                </Typography>
            </Box>
        </>
    );
}
