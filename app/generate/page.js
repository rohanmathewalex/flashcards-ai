'use client'

import { useUser } from "@clerk/nextjs";
import { Container, TextField, Typography, Box, Paper, Button, Modal, IconButton, AppBar, Toolbar, Grid, Card, CardActionArea, CardContent, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SaveIcon from '@mui/icons-material/Save';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import CloseIcon from '@mui/icons-material/Close';
import { SignedIn, UserButton } from "@clerk/nextjs";

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
        // Save flashcards logic here
        console.log("Flashcards saved");
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
                            sx={{ mb: 2 }}
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

                {/* Flashcards Preview */}
                {flashcards.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Flashcard Preview
                        </Typography>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <Paper
                                            sx={{
                                                padding: 3,
                                                height: '200px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                boxShadow: 3,
                                                overflow: 'hidden',
                                                backgroundColor: flipped[index] ? '#f5f5f5' : '#ffffff',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    height: '100%',
                                                    overflowY: 'auto', // Ensures long text is scrollable
                                                    padding: 2,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        wordWrap: 'break-word', // Ensures long words don't overflow
                                                    }}
                                                >
                                                    {flipped[index] ? flashcard.back : flashcard.front}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </CardActionArea>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

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
