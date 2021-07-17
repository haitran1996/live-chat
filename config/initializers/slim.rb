Rails.application.config.after_initialize do |app|
  app.config.assets.configure do |env|
    env.register_engine(".slim", Slim::Template)
  end
end
