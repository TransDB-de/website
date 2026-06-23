export interface CMSUser {
	id: string;
	username: string;
	admin: boolean;
}

export type LoginResponse = CMSUser;
