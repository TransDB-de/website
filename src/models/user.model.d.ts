export interface CMSUser {
	id: string;
	username: string;
	admin: boolean;
}

export interface ApiUser {
	id: string;
	name: string;
}

export type ApiUserList = ApiUser[];

export type LoginResponse = CMSUser;
