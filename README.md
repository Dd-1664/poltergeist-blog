# Poltergeist Project

---

# DB:

* Exécuter `php bin/console doctrine:database:create` pour créer la base sans table
* Exécuter `php bin/console doctrine:schema:create` pour créer la structure des tables sans contenu
* Exécuter `php bin/console doctrine:schema:validate` pour verifier que tout est bon avec le mapping

---

# DOCKER

# Build l'image Docker

docker build
-t [NAME:TAG] .

# Lancer Docker

docker build
-t [NAME:TAG] .

docker run
-p 8089:80
-v [HOST-PATH]:/var/www/html
--name [IMAGE TAG][image id]

ou utiliser Kitematic (Docker GUI):

# EXEMPLE DOS

* `docker build -t blog .`
* `docker run -p 8088:80 -v $(pwd):/var/www/html --name blog blog`
* `docker run --rm -p 8088:80 -v c:/Users/jaden/Desktop/DEV/poltergeist-blog:/var/www/html --name blog blog`
* Access <http://localhost:8088/app_dev.php>

---

# Copie

* `docker cp -a [CONTAINER NAME]:var/www/html/ [LOCAL FOLDER]`

A Symfony project created in 2018.
