'use client'

import { useUser } from "@clerk/nextjs";
import { Container, TextField, Typography, Box, Paper, Button, AppBar, Toolbar, Grid, Card, CardContent, CardActionArea, Modal, IconButton } from "@mui/material";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function Generate() {
    const { isLoaded, isSignedIn } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);

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
        // Logic to save flashcards to the database
        console.log("Flashcards saved:", name, flashcards);
        handleClose();
    };

    return (
        <>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    {isSignedIn && <UserButton />}
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Generate Flashcards
                    </Typography>
                </Box>

                <Paper sx={{ p: 4, textAlign: 'center', boxShadow: 3, mb: 4 }}>
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
                        onClick={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        Generate Flashcards
                    </Button>
                </Paper>

                {/* Flashcards Preview */}
                {flashcards.length > 0 && (
                    <>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" gutterBottom>
                                Flashcard Preview
                            </Typography>
                            <Grid container spacing={3}>
                                {flashcards.map((flashcard, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                height: '300px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                perspective: '1000px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleCardClick(index)}
                                        >
                                            <CardActionArea
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '100%',
                                                    transformStyle: 'preserve-3d',
                                                    transition: 'transform 0.6s',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {/* Front of the Card */}
                                                <CardContent
                                                    sx={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: 2,
                                                        textAlign: 'center',
                                                        boxShadow: 3,
                                                    }}
                                                >
                                                    <Typography variant="h6" component="div" sx={{ overflowWrap: 'break-word' }}>
                                                        {flashcard.front}
                                                    </Typography>
                                                </CardContent>

                                                {/* Back of the Card */}
                                                <CardContent
                                                    sx={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: 2,
                                                        textAlign: 'center',
                                                        boxShadow: 3,
                                                        transform: 'rotateY(180deg)',
                                                    }}
                                                >
                                                    <Typography variant="h6" component="div" sx={{ overflowWrap: 'break-word' }}>
                                                        {flashcard.back}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        {/* Save Flashcards Button */}
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
                    </>
                )}

                {/* Save Flashcards Modal */}
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
