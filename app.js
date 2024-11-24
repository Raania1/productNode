const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'Produits'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM produit';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', { produit: results });
    });
});

// app.get('/api/like/:pid', function(req, res) {
//     const idP = req.params.pid;  
//     const sql = 'INSERT INTO likes (produit_id) VALUES (?)';
//     db.query(sql, [idP], function(err, result) {
//         if (err) {
//             return res.status(500).json({ error: 'Erreur lors de l\'insertion du like' });
//         }
//         res.redirect('/')
//     });
// });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
