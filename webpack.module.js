import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { distPath } from './helper.js';

export let common = {
  entry: {
    "quill-emoji": './src/quill-emoji.js'
  },
  experiments:{
    outputModule:true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fullySpecified: false
  },
  output: {
    filename: 'quill-emoji.js',
    path: distPath,
    clean: true,
    library: {
      // name:"WMLQuillEmoji",
      type: "module", // This specifies that the output should be ESM
      // export: 'default',
    },
    globalObject: 'this',
  },
  target: 'web',
  externals: {
    quill: "quill",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'quill-emoji.css',
      chunkFilename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'package.json',
          to: 'package.json',
          transform: (content, path) => {
            const packageJson = JSON.parse(content.toString());
            packageJson.main = 'quill-emoji.js';
            delete packageJson.scripts;
            delete packageJson.devDependencies;
            return JSON.stringify(packageJson, null, 2);
          }
        },
        { from: 'README.md', to: 'README.md' },
        { from: 'LICENSE', to: 'LICENSE', toType: 'file' }
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }] // Ensure Babel does not transform modules
              ]
            }
          }
        ],
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  }
};
