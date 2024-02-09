const { Client } = require('ssh2');

class BaxterControl {

    constructor(config) {
        if(config){
            console.log(config)
            this.config = config;
            this.conn = new Client();
            this.connect().catch(console.error);
        } else {
            console.error('No config provided');
        }
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.conn.on('ready', () => {
                console.log('Connection :: ready');
                resolve(this); // Resolve with the instance of SSHConnection
            }).on('error', (err) => {
                reject(err);
            }).connect(this.config);
        });
    }

    executeCommand(command) {
        return new Promise((resolve, reject) => {
            this.conn.exec(command, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                let data = '';
                stream.on('close', () => {
                    resolve(data);
                }).on('data', (chunk) => {
                    data += chunk;
                }).stderr.on('data', (chunk) => {
                    reject(new Error(`STDERR: ${chunk}`));
                });
            });
        });
    }

    close() {
        this.conn.end();
    }

    async control(data) {
        // TODO: Convert data to ssh command
        try {
            const result = await this.executeCommand('uptime');
            return { result: result };
        } catch (error) {
            console.error(error);
            return { error: `An error occurred: ${error.message}` };
        }
    }
}

module.exports = BaxterControl;