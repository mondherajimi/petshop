# Petshop 

L'application "Petshop" est une application permettant de gérer un catalogue d'animaux.


## Description technique
Le projet se décompose en 2 parties :
* une partie serveur
* une partie cliente

La **partie serveur** expose les webservices REST pour la consultation / l'ajout / la modification / et la suppression d'animaux.
Il s'agit d'un serveur NodeJS tournant sous Express.
Le code serveur se trouve à la racine.

La **partie cliente** correspond à l'interface utilisateur en ReactJS.
Le "bundle" généré par cette application React est intégrée à la page principale de l'application serveur.
Le code de l'application React se trouve dans le répertoire "/client".

Le catalogue d'animaux est persisté en base de données MongoDB.

Afin de ne pas surcharger le serveur, les appels webservices sont cachés coté client (dans le state redux) avec une durée d'expiration fixée à 10 minutes.

En cas de modification du catalogue, l'utilisation de socket.io permet une re-synchronisation en temps réel du state de chaque utilisateur connecté.
 

## Documentation de l'API
L'API REST est documentée via swagger :
https://github.com/okyear/petshop/blob/master/app/public/swagger/api.yaml

En démarrant l'application, une instance de Swagger UI est mise à disposition pour tester les services :
http://localhost:4000/swagger/

## Installation

 * Installer NodeJS v6.x.x ou supérieur : https://nodejs.org/
 * Installer MongoDB : https://www.mongodb.com/download-center#community

### Lancement du projet

#### Lancement en mode développement
Démarrer la base MongoDB :
``mongod --dbpath="**CHEMIN OU STOCKER LA BASE MONGODB **"``

Lancer la partie serveur :
```sh
cd petshop
npm install
npm run start-dev
```

Lancer la partie cliente :
```sh
cd client
npm install
npm start
```

L'application est alors disponible à l'adresse suivante : 
http://localhost:4000/

(l'interface UI est exposée sur l'adresse suivante : http://localhost:3000/static/js/bundle.js)

#### Déploiement de l'application

Après avoir ``npm install`` les deux modules (serveur et client), vous pouvez packager l'application via la commande suivante au niveau de la racine :
 `` npm run build``
 
 Le dossier "build" est alors créé à la racine; il correspond au livrable déployable sur une machine de recette ou de production.
 
 Vous pouvez changer les valeurs du fichier **configuration.json** en fonction des spécificités de l'environnement.
 
 Pour lancer l'application à partir du livrable, commencez par ``npm install`` puis lancez le serveur vi la commande :
 ```
 npm start
 ```
 Pour plus de personnalisation, vous pouvez également définir un scriptshell de la forme suivante :
 ```sh
 export NODE_ENV=production
 export PORT=4000
 CONFIG=/home/configuration.json
 node ./index.js
 ```
 Cela vous permettra de redéfinir le PORT utilisé par le serveur (4000 par défaut) ou le chemin vers le fichier de configuration.
 
 ### Fichier de configuration
 Le fichier configuration.json permet de définir les valeurs de configuration suivantes :
 
 ```json
{
  "mongodb": "url de la base de données mongodb. Exemple : mongodb://localhost:27017/petshop",
  "webhost": "url du serveur NodeJS sur le réseau. Example :http://localhost:4000"
}
```