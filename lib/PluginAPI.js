

class PluginAPI {
    constructor (opts) {
        this.id = opts.id;
        this.service = opts.service;
    }

    registerCommand (command) {
        const { name } = command;
        this.service.commands[name] = command;
    }

    register (hook) {
      
        this.service.hooksByPluginId[this.id] = (
            this.service.hooksByPluginId[this.id] || []
        ).concat(hook);

        console.log(this.service.hooksByPluginId)

    }


}

module.exports = PluginAPI;