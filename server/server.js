import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import path from 'path';
import index from './routes/v1/index';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';


const app = express();
const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler));
app.use(require('webpack-hot-middleware')(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));


app.use(express.static(path.join(__dirname, '../client')));

// API Docs
const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);

app.use(cors({ credentials: true, origin: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Port
const port = process.env.PORT || '3000';
app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', index);

app.use('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/index.html'));
});

/**
 * Listen on provided port
 */
app.listen(port);

export default app;
