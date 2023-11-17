import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import configuration from './utils/configurations';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import bodyParser from 'body-parser';
import session from 'express-session';
import postRoutes from './routes/post.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from './utils/passport';

const app = express();
const port = configuration.getKey('PORT') || 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;
mongoose
  .connect(configuration.getKey('MONGO_SERVER'), {
    dbName: configuration.getKey("MONGO_DB"),
  })
  .then(db => {
    console.log("Base de datos conectada");
  })
  .catch(err => {
    console.log(`Error BD => ${err}`);
  });

app.use(morgan("dev"));

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
})

