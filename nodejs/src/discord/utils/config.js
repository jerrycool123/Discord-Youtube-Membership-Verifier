import fs from 'fs';

class Config {
  constructor() {
    const rawChannels = fs.readFileSync(__dirname + '/../configs/membership.json');
    this.channels = JSON.parse(rawChannels);
  }
}

const config = new Config();

export default config;