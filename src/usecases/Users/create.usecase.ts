import bcrypt from 'bcrypt';
import User from '../../models/users.class';
import { UserRepository } from '../../repository';

export type SignUserDTO = {
	name: string;
	password: string;
};

type SignUserReturn = {
	success: boolean;
	message: string;
	newUser?: User;
};

export class SignUser {
	#data: SignUserDTO;

	constructor(data: SignUserDTO) {
		this.#data = data;
	}

	async execute(): Promise<SignUserReturn> {
		const user = new UserRepository().findUserByName(this.#data.name);
		if (user) {
			return {
				success: false,
				message: 'Usuário já existe',
			};
		}
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(this.#data.password, salt);

		const newUser = await new UserRepository().create({
			name: this.#data.name,
			password: hashedPassword,
		});

		return {
			success: true,
			message: 'Usuário criado com sucesso',
			newUser,
		};
	}
}
