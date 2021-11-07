import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve as resolvePath } from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const projectDir = resolvePath(__dirname, '../');
const rendererDir = resolvePath(projectDir, 'src/renderer');
const isDev = process.env.NODE_ENV === 'development';
const devEntries = ['webpack/hot/dev-server.js', 'webpack-dev-server/client/index.js?hot=true'];
const TEST_FONT_PATH = resolvePath(rendererDir, 'Roboto-Black.ttf');
const configuration: Configuration = {
    target: 'electron-renderer',
    entry: [...(isDev ? devEntries : []), resolvePath(rendererDir, 'index.tsx')],
    output: {
        path: resolvePath(projectDir, 'build'),
        filename: 'js/[name].js',
    },
    externals: {
        fontkit: 'commonjs fontkit',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: 'body',
            scriptLoading: 'blocking',
            template: resolvePath(rendererDir, 'public/index.html'),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolvePath(rendererDir, 'tsconfig.json'),
            },
        }),
        new DefinePlugin({
            TEST_FONT_PATH: JSON.stringify(TEST_FONT_PATH)
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
                options: {
                    filterSourceMappingUrl: (url: string, resourcePath: string) => {
                        if (/broker-source-map-url\.js$/i.test(url)) {
                            return false;
                        }

                        if (/skip-module/i.test(resourcePath)) {
                            return 'skip';
                        }

                        return true;
                    },
                },
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[hash]-[name][ext][query]',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'fonts/[hash]-[name][ext][query]',
                },
            },
        ],
    },
};

export default configuration;
