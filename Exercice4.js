const express = require('express');
const app = express();
app.use(express.static('public'));

const transforme_en_tableau = (collection) =>
{	
	let chaine = '<table>'
	for (elm of collection){
		chaine += '<tr>';
		for(p in elm){
			chaine += '<td>' + elm[p] + '</td>';
		}
		chaine += '</tr>';
	}
	chaine += '</table>'
	return chaine
}
/////////////////////////////////////////////////////////// Route /html/01_form.htm
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "01_form.htm" );
})
/////////////////////////////////////////////////////////// Route /
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

/////////////////////////////////////////////////////////// Route /traiter_get
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel

 };
console.log(reponse);
 res.end(JSON.stringify(reponse));

const fs = require('fs');

 fs.appendFile((__dirname + "/public/data/" + 'membre.txt') , "," + JSON.stringify(reponse), function (err) {
  		if (err) throw err;
  		console.log('Sauvegardé');
	});
})

/////////////////////////////////////////////////////////// Route /membre

app.get('/membre', function (req, res) {
	const fs = require('fs');
	fs.readFile(__dirname + "/public/data/" + 'membre.txt', 'utf8', function (err, data) {
 		if (err) throw err;
 		let collection = JSON.parse('['+data+']');
 		res.end(transforme_en_tableau(collection));
	});

})


var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})

