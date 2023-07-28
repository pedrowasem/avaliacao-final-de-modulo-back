import Notes from '../../models/notes.class';
import { NotesRepository } from '../../repository';

export type UpdateNoteDTO = {
	id: string;
	title: string;
	description: string;
};

type UpdateReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class UpdateNote {
	#data: UpdateNoteDTO;

	constructor(data: UpdateNoteDTO) {
		this.#data = data;
	}

	public execute(): UpdateReturn {
		const index = new NotesRepository().getNoteById(this.#data.id);
		if (index === -1) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		const { title, description } = this.#data;

		const UpdateNote = new NotesRepository().update(index, { title, description });

		return {
			success: true,
			message: 'Note updated successfully',
			updatedData: UpdateNote,
		};
	}
}
