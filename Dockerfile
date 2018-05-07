FROM injah/php7.1:win

ENV DEBIAN_FRONTEND=noninteractive

# First copy composer in docker to install it
COPY composer.json /var/www/html/
COPY composer.lock /var/www/html/

# WARNING: GITHUB TOKEN
COPY docker/auth.json /home/.composer/

# this will only download vendors and be cached on the host
# TODO: REWORK
RUN /bin/bash -c 'composer install --working-dir=/var/www/html/ --no-scripts --no-suggest --no-autoloader'

# install node dependencies with npm..
COPY package.json /var/www/html/
RUN /bin/bash -c 'cd /var/www/html/ && npm install'

# === THE REAL STUFF ==
# Copy all the source (This will invalidate cache)
COPY . /var/www/html/.

RUN /bin/bash -c 'chmod +x /var/www/run-symfony.Win.sh'

# remove pre-existing cache (cache folder is recreated in script run-symfony)
RUN /bin/bash -c 'cd /var/www/html/ && rm -rf var/cache/'

# Install composer autoloader
# TODO: REWORK
RUN /bin/bash -c 'composer install --optimize-autoloader --working-dir=/var/www/html/'

# Run Webpack
# TODO: REWORK (production)
RUN /bin/bash -c 'cd /var/www/html/ && node_modules/.bin/encore production'

# TODO: REWORK
RUN /bin/bash -c 'cd /var/www/html/ && php bin/console assets:install && rm -rf var/cache/*'

EXPOSE 80

# Need this to edit volumes on KiteMatic
# VOLUME /var/www/html/

# Run Symfony script
CMD ["/bin/bash", "-c", "/var/www/run-symfony.Win.sh"]