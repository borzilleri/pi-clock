import toml from 'toml'
import { readFileSync } from 'fs'

const config = toml.parse(readFileSync('./config.toml', 'utf8'));

export default config;
