const randombytes = require('randombytes');
const path = require('path');
const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = path.join(__dirname, 'uploads'); // Example upload directory
        fs.mkdirSync(directory, { recursive: true }); // Create directory if it doesn't exist
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const filename = randombytes(16).toString('hex') + '.' + file.mimetype.split('/')[1];
        cb(null, filename);
    }
});
const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
    const fileName = req.file.filename;
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const size = req.file.size;

    res.json({ message: 'File uploaded successfully!', fileName });
});

app.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.sendFile(filePath);
});

const port = process.env.PORT || 3000; // Use environment variable or default port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
