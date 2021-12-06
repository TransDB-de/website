export interface User {
	_id ?: string;
	username: string,
	email ?: string,
	registerDate: string,
	lastLogin: null | Date,
	admin: boolean,
	password ?: string,
}

export interface LoginResponse {
	user: User,
	token: string
}