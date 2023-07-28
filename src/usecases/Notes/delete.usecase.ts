import Notes from '../../models/notes.class';
import { NotesRepository } from '../../repository';

type DeleteNoteReturn = {
	success: boolean;
	message: string;
	deletedNote?: Notes;
};

export class DeleteNote {
	#id: string;

	constructor(id: string) {
		this.#id = id;
	}

	public execute(): DeleteNoteReturn {
		const index = new NotesRepository().getNoteById(this.#id);

		if (index === -1) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		const note = new NotesRepository().delete(index);

		return {
			success: true,
			message: 'Note deleted successfully',
			deletedNote: note,
		};
	}
}
