export interface CMSUser {
	id: string;
	username: string;
	admin: boolean;
}

export interface LoginResponse {
	user: CMSUser;
	token: string;
}
