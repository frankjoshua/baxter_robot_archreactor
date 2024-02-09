const fs = require('fs').promises;

class SettingsManager {
  constructor() {
    this.settings = {};
    this.settingsFilePath = './settings.jsn';
    this.loadSettingsFromFile().catch(console.error);
  }

  async loadSettingsFromFile() {
    try {
      const data = await fs.readFile(this.settingsFilePath, 'utf8');
      this.settings = JSON.parse(data);
    } catch (error) {
      console.error('Error reading settings from file:', error);
      // Initialize with default settings if file is not found or is empty
      this.settings = {};
    }
  }

  async saveSettingsToFile() {
    try {
      const data = JSON.stringify(this.settings, null, 2); // Pretty print JSON
      await fs.writeFile(this.settingsFilePath, data, 'utf8');
    } catch (error) {
      console.error('Error saving settings to file:', error);
    }
  }

  getSettings() {
    return this.settings;
  }

  async setSettings(settings) {
    this.settings = { ...this.settings, ...settings };
    await this.saveSettingsToFile();
  }
}

module.exports = SettingsManager;