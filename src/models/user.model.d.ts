export interface User {
	username: string,
	email?: string,
	registerDate: string,
	lastLogin: null | Date,
	admin: boolean
}

export interface LoginResponse {
	user: User,
	token: string
}