const { Client } = require('ssh2');

class BaxterControl {

    constructor(config) {
        if(config){
            this.config = { 
                ...config,
                debug: console.log
            }
            console.log(this.config)
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
        // Initialize results with default values
        let results = {
            uptime: null,
            left: null,
            right: null,
            errors: [] // Collect errors for each part
        };
    
        try {
            const left = data.arms.left;
            const right = data.arms.right;
    
            // Uptime command
            try {
                results.uptime = await this.executeCommand('uptime');
            } catch (error) {
                console.error('Uptime command failed:', error);
                results.errors.push(`Uptime error: ${error.message}`);
            }
    
            // Left arm command
            try {
                results.left = await this.executeCommand(`./arm_control.sh -p ${left.arm_rotate} ${left.shoulder} ${left.elbow} ${left.forarm} ${left.wrist} ${left.hand} 0.0 -l left`);
            } catch (error) {
                console.error('Left arm command failed:', error);
                results.errors.push(`Left arm error: ${error.message}`);
            }
    
            // Right arm command
            try {
                results.right = await this.executeCommand(`python arm_control.py -p ${right.arm_rotate} ${right.shoulder} ${right.elbow} ${right.forarm} ${right.wrist} ${right.hand} 0.0 -l right`);
            } catch (error) {
                console.error('Right arm command failed:', error);
                results.errors.push(`Right arm error: ${error.message}`);
            }
    
            return results;
        } catch (error) {
            // This catch block now only serves as a fallback in case there are unexpected issues
            console.error('Unexpected error in control function:', error);
            return { ...results, error: `An unexpected error occurred: ${error.message}` };
        }
    }
    
}

module.exports = BaxterControl;