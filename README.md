# Build Stats Webpack Plugin
Webpack plugin to generate build stats.

[![npm](https://img.shields.io/npm/v/build-stats-webpack-plugin.svg)](https://www.npmjs.com/package/build-stats-webpack-plugin)
[![GitHub issues](https://img.shields.io/github/issues/sun1l/build-stats-webpack-plugin.svg)](https://github.com/sun1l/build-stats-webpack-plugin/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/sun1l/build-stats-webpack-plugin/master/LICENSE)

[Installation](#installation) |
[Usage](#usage) |
[License](#license)

## Installation

```bash
npm install build-stats-webpack-plugin --save-dev
```

## Usage

```javascript
// webpack.config.js

const buildStatsPlugin = require('build-stats-webpack-plugin');

module.exports = {
    entry: {
        'core': './src/core.js',
        'app': './src/index.js',
        'angular-suite': ['angular', 'angular-ui-bootstrap', 'angular-ui-router'],
    },
    output: {
        'filename': '[name].js',
        'path': path.resolve(__dirname, 'dist')
    },
    plugins: [
        new buildStatsPlugin()
    ]
};
```
Once you do the build, this will generate `build-stats.json` file in root folder.

```javascript
{
    "name": "Project Name",
    "version": "1.0.0",
    "errors": [],
    "warnings": [],
    "assets": [
        { "name": "app.js", "size": 4326 },
        { "name": "angular-suite.js", "size": 3217 },
        { "name": "core.js", "size": 3858 }
    ],
    "modules": [
        {
            "id": "./node_modules/angular/index.js",
            "path": "/Users/sku247/Work/wp/node_modules/angular",
            "size": 48,
            "name": "angular",
            "version": "1.6.6"
        },
        {
            "id": "./node_modules/lodash/lodash.js",
            "path": "/Users/sku247/Work/wp/node_modules/lodash",
            "size": 333,
            "name": "lodash",
            "version": "4.17.4"
        },
        {
            "id": "./node_modules/jquery/dist/jquery.js",
            "path": "/Users/sku247/Work/wp/node_modules/jquery",
            "size": 263,
            "name": "jquery",
            "version": "3.2.1"
        },
        {
            "id": "./node_modules/angular-ui-bootstrap/index.js",
            "path": "/Users/sku247/Work/wp/node_modules/angular-ui-bootstrap",
            "size": 34,
            "name": "angular-ui-bootstrap",
            "version": "2.5.6"
        },
        {
            "id":
                "./node_modules/angular-ui-router/release/angular-ui-router.js",
            "path": "/Users/sku247/Work/wp/node_modules/angular-ui-router",
            "size": 166,
            "name": "angular-ui-router",
            "version": "0.4.3"
        }
    ]
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
