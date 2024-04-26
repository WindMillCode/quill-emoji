import { merge } from 'webpack-merge';
import {common} from './webpack.common.js';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import  ImageMinimizerPlugin  from 'image-minimizer-webpack-plugin';




export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize:true,
    minimizer: [
      new TerserPlugin({
        // minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          compress:{
            defaults: true,
            passes:2000
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['optipng', { optimizationLevel: 7 }],
            ],
          },
        },
      }),
    ],
  },

});
