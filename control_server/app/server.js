const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerConfig');
const BaxterControl = require('./baxterControl');
const SettingsManager = require('./settingsManager');

const settingsManager = new SettingsManager();
var baxterControl = {};
const app = express();
const PORT = process.env.PORT || 3535;


app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.post('/control', async (req, res) => {
    const status = await baxterControl.control(req.body);
    res.send(status);
});

function updateSettings() {
    const settings = settingsManager.getSettings();
    settingsManager.setSettings(settings);
    baxterControl = new BaxterControl(settings.sshConfig);
}

app.post('/settings', (req, res) => {
    if (req.body) {
        settingsManager.setSettings(req.body);
        updateSettings();
        res.send(settingsManager.getSettings());
    } else {
        res.status(400).send('No settings provided');
    }
});

// Must be last route
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, async () => {
    await settingsManager.loadSettingsFromFile();
    updateSettings();

    console.log(`Server is running on http://localhost:${PORT}`);
});
