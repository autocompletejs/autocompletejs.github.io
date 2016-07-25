FROM ruby:2.3

COPY ./docker/jekyll/entrypoint.sh /entrypoint.sh
COPY Gemfile /data/Gemfile

WORKDIR /data

RUN adduser jekyll --uid 1000 --home /data --disabled-password \
	&& bundle install \
	&& curl -sL https://deb.nodesource.com/setup_4.x | bash - \
	&& apt install -y \
		nodejs \
	&& git config --global push.default simple \
	&& git config --global user.email "baptiste.donaux@gmail.com" \
	&& git config --global user.name "Baptiste Donaux" \
    && chmod +x /entrypoint.sh \
    && mkdir \
		/.cache \
		/.config \
		/.local \
		/.npm \
	&& chmod 777 -R \
		/.cache \
		/.config \
		/.local \
		/.npm \
		/entrypoint.sh \
    && rm -rf /var/lib/apt/lists/*

USER jekyll

ENTRYPOINT ["/entrypoint.sh"]
