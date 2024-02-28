const express = require('express');
const multer  = require('multer');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


//======================================================================

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

    if (!req.file) {
        return res.json({ error: 'No file uploaded' });
    }

    const fileInfo = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    };

    return res.json(fileInfo);
});
//======================================================================




const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});
