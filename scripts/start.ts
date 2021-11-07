import webpack from 'webpack';
import WebpackDevServer, { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import webpackConfig from './webpack.config.dev';

const compiler = webpack(webpackConfig);
const port = 3000;
const devServerOptions: DevServerConfiguration = {
    // hot 和 client 都已经在 entry 中配置好了
    hot: false,
    client: false as any,
    liveReload: true,
    port,
    open: false,
    devMiddleware: {
        stats: 'minimal',
        writeToDisk: true,
    },
};
const server = new WebpackDevServer(devServerOptions, compiler as any);
server.start();
