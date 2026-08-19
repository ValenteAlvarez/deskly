from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
	mongo_uri: str
	frontend_url: str
	webhook_secret: str
	db_name: str
	model_config = SettingsConfigDict(env_file="../.env", extra='ignore')

settings = Settings() #type: ignore