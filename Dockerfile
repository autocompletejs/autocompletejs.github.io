FROM ruby:2.3

WORKDIR /data

EXPOSE 4000

COPY Gemfile /data/Gemfile

RUN bundle install

ENTRYPOINT ["jekyll"]

CMD ["help"]