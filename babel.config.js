const packageJSON = require('./package.json');

module.exports = (api) => {
    api.cache(true);

    const envPreset = [
        '@babel/env',
        {
            modules: false,
            targets: 'Chrome > 61.0.3163.91',
            bugfixes: true,
            useBuiltIns: 'usage',
            corejs: { version: packageJSON.devDependencies['core-js'].replace('^', '') },
        },
    ];

    return {
        presets: ['@babel/preset-typescript', envPreset],
        plugins: [
            '@babel/plugin-transform-runtime',
            ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
        ],
        env: {
            development: {
                presets: [['@babel/preset-react', { runtime: 'automatic', development: true }]],
                plugins: [require.resolve('react-refresh/babel')],
            },
            production: {
                presets: [['@babel/preset-react', { runtime: 'automatic' }]],
            },
        },
    };
};
