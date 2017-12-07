import utils from './utils';

export default class buildStatsPlugin {

    constructor(config) {

      let defaultConfig = {
        output: utils.getDefaultPath('build-stats.json'),
        raw: false
      };

      this.config = {...defaultConfig, ...config};
    }

    getBuildMeta(stats){
      let meta = {};

      let path = utils.getRootPath() + '/package.json';

      if(utils.isFileExist(path)){
        let content = utils.readFile(path);
        let json = utils.parseJson(content);
        meta.name = json.name;
        meta.version = json.version;
      }

      meta.errors = stats.errors;
      meta.warnings = stats.warnings;

      return meta;
    }

    getAssets(stats){
      let assets = [];

      stats.assets.forEach(asset => {
        let assetMeta = {
          name: asset.name,
          size: asset.size
        };

        assets.push(assetMeta);
      });

      return assets;

    }

    getModules(stats){
      let modules = [];

      stats.modules.forEach(module => {
        let moduleMeta = {};

        if(utils.isNodeModulePath(module.name) && module.depth === 1){
          moduleMeta = {
            id: module.name,
            path: this.getModuleDirectory(module),
            size: module.size
          };

          let packageJsonPath = moduleMeta.path + '/package.json';
          if (utils.isFileExist(packageJsonPath)) {
            let json = utils.parseJson(utils.readFile(packageJsonPath));

            if (json) {
              moduleMeta.name = json.name;
              moduleMeta.version = json.version;
            }
          }

          modules.push(moduleMeta);
        }
      });

      return modules;
    }

    getModuleDirectory(module){
      let path = require('path');
      let modulePath = path.dirname(path.resolve(module.name));

      while(!utils.isFileExist(modulePath + '/package.json')){
        modulePath = path.dirname(modulePath);

        if(!utils.isNodeModulePath(modulePath)){
          break;
        }
      }

      return modulePath;
    }

    handleOutout(stats){
      if(typeof this.config.output === 'function'){
        this.config.output(stats);
      } else if (typeof this.config.output === 'string'){
        console.log('Writing file ... ' + this.config.output);
        utils.writeFile(this.config.output, JSON.stringify(stats));
      }
      return stats;
    }

    apply(compiler) {

      compiler.plugin('emit', (compilation) => {
        let stats;
        let statsRaw = compilation.getStats().toJson();

        if(this.config.raw === true){
          return this.handleOutout(statsRaw);
        }

        stats = {
          ...this.getBuildMeta(statsRaw),
          assets: this.getAssets(statsRaw),
          modules: this.getModules(statsRaw)
        };

          this.handleOutout(stats);
        });
    }
}
