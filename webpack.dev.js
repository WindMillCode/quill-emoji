
import path from 'path';
import { merge } from 'webpack-merge';
import {common} from './webpack.common.js';
import {distPath} from './helper.js'



export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // mode: 'production',
  // devtool: 'source-map',
  devServer: {
    static: distPath,
    devMiddleware: {
      publicPath: distPath,
      writeToDisk: (filePath) => {
        return !(/hot-update/.test(filePath));
      },
    },
    port: 8082
  },


});
