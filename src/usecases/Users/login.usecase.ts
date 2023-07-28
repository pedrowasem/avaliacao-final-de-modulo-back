import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repository';

export type LoginDTO = {
	name: string;
	password: string;
};
type LoginReturn = {
	success: boolean;
	message: string;
	token?: string;
};
export class Login {
	#data: LoginDTO;

	constructor(data: LoginDTO) {
		this.#data = data;
	}

	async execute(): Promise<LoginReturn> {
		const user = await new UserRepository().findUserByName(this.#data.name);

		if (!user) {
			return {
				success: false,
				message: 'User not found',
			};
		}

		const isPasswordCorrect = await bcrypt.compare(this.#data.password, user._password);
		if (!isPasswordCorrect) {
			return {
				success: false,
				message: 'Wrong password',
			};
		}

		const payload = { id: user._id.toString(), name: user._name };

		const token = jwt.sign(payload, process.env.JWT_SECRET!);

		if (!token) {
			return {
				success: false,
				message: 'Failed to login',
			};
		}
		return {
			success: true,
			message: 'User logged successfully',
			token,
		};
	}
}
