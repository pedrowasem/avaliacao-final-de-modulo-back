import { notesDb } from '../../database';
import Notes from '../../models/notes.class';
import { CreateNoteDTO, ListNotesFiltersDTO, UpdateNoteDTO } from '../../usecases/Notes';

export class NotesRepository {
	listNotes({ userId, titleParse, favoriteParse, storedParse }: ListNotesFiltersDTO) {
		const notes = notesDb.filter((note) => note.toJson()._userId.includes(userId));
		let filteredNotes = notes;
		filteredNotes = filteredNotes.filter((note) => note.toJson()._stored === storedParse);
		if (titleParse) {
			filteredNotes = filteredNotes.filter((note) =>
				note.toJson()._title.includes(titleParse),
			);
		}
		if (favoriteParse) {
			filteredNotes = filteredNotes.filter(
				(note) => note.toJson()._favorite === favoriteParse,
			);
		}
		return filteredNotes;
	}

	create(data: CreateNoteDTO) {
		const newNote = new Notes(data);

		notesDb.push(newNote);

		return newNote;
	}

	getNoteById(id: string) {
		return notesDb.findIndex((note) => note.toJson()._id === id);
	}

	update(index: number, { title, description }: Omit<UpdateNoteDTO, 'id'>) {
		const note = notesDb[index].update({ title, description });

		return note;
	}

	delete(index: number) {
		return notesDb.splice(index, 1)[0];
	}

	favorite(index: number) {
		notesDb[index].toogleFavorite();
		return notesDb[index];
	}

	store(index: number) {
		notesDb[index].toogleStored();
		return notesDb[index];
	}
}
