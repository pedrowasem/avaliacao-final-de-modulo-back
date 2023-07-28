import Notes from '../../models/notes.class';
import { NotesRepository } from '../../repository';

type FavoriteNoteReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class FavoriteNote {
	#id: string;

	constructor(id: string) {
		this.#id = id;
	}

	public execute(): FavoriteNoteReturn {
		const index = new NotesRepository().getNoteById(this.#id);

		if (index === -1) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		const note = new NotesRepository().favorite(index);

		if (!note.toJson()._favorite) {
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
