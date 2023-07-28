import { usersDb } from '../../database';
import User from '../../models/users.class';
import { SignUserDTO } from '../../usecases/Users';

export class UserRepository {
	list() {
		const users: User[] = usersDb;

		return users.map((user) => user.toJson());
	}

	create(data: SignUserDTO) {
		const user = new User(data);

		usersDb.push(user);

		return user;
	}

	findUserByName(name: string) {
		const user = usersDb.find((user) => user.toJson()._name === name);

		if (!user) return;

		return user.toJson();
	}
}
