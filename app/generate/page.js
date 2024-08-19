'use client'

import { useUser } from "@clerk/nextjs";
import { Container, TextField, Typography, Box, Paper, Button, AppBar, Toolbar, Grid, Card, CardContent, CardActionArea, Modal, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore";
import { db } from '../../firebase';
import { TabContext, TabPanel } from '@mui/lab';

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [savedCollections, setSavedCollections] = useState([]);
    const [tabValue, setTabValue] = useState("1"); // Control tabs for viewing or generating flashcards
    const [selectedCollection, setSelectedCollection] = useState(null);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setSelectedCollection(null); // Reset selected collection when switching tabs
    };

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
        if (!isSignedIn) {
            alert('You must be signed in to save flashcards.');
            return;
        }

        if (!name) {
            alert('Please enter a name for your flashcard collection.');
            return;
        }

        try {
            const batch = writeBatch(db);
            const userDocRef = doc(db, 'users', user.id);
            const docSnap = await getDoc(userDocRef);

            let collections = [];

            if (docSnap.exists()) {
                collections = docSnap.data().flashcards || [];
            }

            if (collections.find(c => c.name === name)) {
                alert('A collection with this name already exists.');
                return;
            }

            collections.push({ name });

            batch.set(userDocRef, { flashcards: collections }, { merge: true });

            const collectionRef = collection(userDocRef, 'collections', name, 'cards');
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(collectionRef);
                batch.set(cardDocRef, flashcard);
            });

            await batch.commit();
            alert('Flashcards saved successfully!');
            setSavedCollections((prev) => [...prev, { name, flashcards }]);

            handleClose();
        } catch (error) {
            console.error('Failed to save flashcards:', error);
            alert('Failed to save flashcards. Please try again.');
        }
    };

    return (
        <>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    {isSignedIn && <UserButton />}
                </Toolbar>
            </AppBar>

            {/* Side Navigation Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <Box sx={{ width: 250 }}>
                    <List>
                        <ListItem button onClick={() => setTabValue("1")}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Generate Flashcards" />
                        </ListItem>
                        <ListItem button onClick={() => setTabValue("2")}>
                            <ListItemIcon>
                                <SaveIcon />
                            </ListItemIcon>
                            <ListItemText primary="Saved Flashcards" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Tabs for Switching Between Views */}
            <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Generate Flashcards" value="1" />
                            <Tab label="Saved Flashcards" value="2" />
                        </Tabs>
                    </Box>

                    <TabPanel value="1">
                        {/* Generate Flashcards View */}
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
                    </TabPanel>

                    <TabPanel value="2">
                        {/* Saved Flashcards View */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Saved Flashcards
                            </Typography>
                        </Box>

                        {savedCollections.length > 0 ? (
                            <Grid container spacing={3}>
                                {savedCollections.map((collection, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card onClick={() => setSelectedCollection(collection)}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {collection.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {collection.flashcards.length} Flashcards
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body1">No flashcards saved yet.</Typography>
                        )}

                        {/* Display Selected Collection */}
                        {selectedCollection && (
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" gutterBottom>
                                    {selectedCollection.name}
                                </Typography>
                                <Grid container spacing={3}>
                                    {selectedCollection.flashcards.map((flashcard, index) => (
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
                                            >
                                                <CardActionArea
                                                    sx={{
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '100%',
                                                        transformStyle: 'preserve-3d',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
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
                        )}
                    </TabPanel>
                </TabContext>
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
