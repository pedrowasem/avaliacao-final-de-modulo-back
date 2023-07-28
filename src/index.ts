import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { NotesController, UsersController } from './controllers';
import {
	validateNoteId,
	validateNotesData,
	validateToken,
	validateUpdateNoteData,
	validateUserData,
} from './middlewares';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const port = process.env.PORT;

app.get('/', (req, res) => {
	return res.json('Hello World!');
});

app.listen(port, () => {
	console.log(`listening on port ${port}!`);
});

// ===============================================

const usersController = new UsersController();

app.post('/users', validateUserData, usersController.create);

app.get('/users', usersController.listAllUsers);

app.post('/login', usersController.login);

const notesController = new NotesController();

app.post('/notes', validateToken, validateNotesData, notesController.create);

app.get('/notes', validateToken, notesController.listNotes);

app.put(
	'/notes/:id',
	validateToken,
	validateNoteId,
	validateUpdateNoteData,
	notesController.update,
);

app.put('/notes/:id/favorite', validateToken, validateNoteId, notesController.favorite);

app.put('/notes/:id/store', validateToken, validateNoteId, notesController.store);

app.delete('/notes/:id', validateToken, validateNoteId, notesController.delete);
