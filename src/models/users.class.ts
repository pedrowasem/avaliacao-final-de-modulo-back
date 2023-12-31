import { randomUUID } from 'crypto';
import { SignUserDTO } from '../usecases/Users';
import { NotesDTO } from './notes.class';

export type UserDTO = {
	_id: string;
	_name: string;
	_password: string;
	_notes: NotesDTO[];
};

export default class User {
	private _id: string;
	private _name: string;
	private _password: string;

	constructor(data: SignUserDTO) {
		this._id = randomUUID();
		this._name = data.name;
		this._password = data.password;
	}

	toJson() {
		return {
			_id: this._id,
			_name: this._name,
			_password: this._password,
		};
	}
}
