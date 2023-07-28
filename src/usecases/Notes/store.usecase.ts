import Notes from '../../models/notes.class';
import { NotesRepository } from '../../repository';

type StoreNoteReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class StoreNote {
	#id: string;

	constructor(id: string) {
		this.#id = id;
	}

	public execute(): StoreNoteReturn {
		const index = new NotesRepository().getNoteById(this.#id);

		if (index === -1) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		const note = new NotesRepository().store(index);

		if (!note.toJson()._stored) {
			return {
				success: true,
				message: 'Message unfavorited',
				updatedData: note,
			};
		}
		return {
			success: true,
			message: 'Message favorited',
			updatedData: note,
		};
	}
}
