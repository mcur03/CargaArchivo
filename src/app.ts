import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import fs from 'fs';
// import path from 'path';

import pacienteRouter from './routes/pacienteRoute';
import medicoRouter from './routes/medicoRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'));

app.use('/api',pacienteRouter);
app.use('/api', medicoRouter);

export default app;


