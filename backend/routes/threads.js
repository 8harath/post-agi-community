const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const authMiddleware = require('../middleware/auth');

// Get all threads
router.get('/', async (req, res) => {
    try {
        const threads = await Thread.find().populate('author', 'username');
        res.json(threads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a single thread by ID
router.get('/:id', async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id).populate('author', 'username');
        if (!thread) {
            return res.status(404).json({ msg: 'Thread not found' });
        }
        res.json(thread);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new thread
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newThread = new Thread({
            title,
            content,
            author: req.user.id
        });

        const thread = await newThread.save();
        res.json(thread);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a thread
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        let thread = await Thread.findById(req.params.id);

        if (!thread) {
            return res.status(404).json({ msg: 'Thread not found' });
        }

        // Check if the user is the author of the thread
        if (thread.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        thread.title = title;
        thread.content = content;

        await thread.save();
        res.json(thread);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a thread
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id);

        if (!thread) {
            return res.status(404).json({ msg: 'Thread not found' });
        }

        // Check if the user is the author of the thread
        if (thread.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await thread.remove();
        res.json({ msg: 'Thread removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
