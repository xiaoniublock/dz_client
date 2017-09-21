class UserUtils {
	private static _instance: UserUtils
	/**存取所有桌上玩家信息 */
	private userPools: Array<User> = [];
	private ownUser: User;
	public static getInstance() {
		if (!this._instance) {
			this._instance = new UserUtils();
		}
		return this._instance;
	}
	public initUsers(users: Array<User>): void {
		this.userPools = users;
		this.sortUsersSeats();
	}
	public pushUser(user: User): User {
		this.sortUserSeat(user);
		this.userPools.push(user);
		return user;
	}
	public popUser(user: User): void {
		for (var i = 0; i < this.userPools.length; i++) {
			if (this.userPools[i].uId == user.uId) {
				this.userPools.splice(i, 1);
				break;
			}
		}
	}
	public getUsers(): Array<User> {
		return this.userPools;
	}
	public getUserFromIndex(index: number): User {

		return this.userPools[index];
	}
	public getUserFromUid(uId: string): User {
		for (var i = 0; i < this.userPools.length; i++) {
			if (this.userPools[i].uId == uId) {
			return this.userPools[i];
			}
		}
	}
	public saveOwnUser(user: User) {
		this.ownUser = user;
	}
	public getOwnUser(): User {
		return this.ownUser;
	}
	public sortUsersSeats() {
		if (this.userPools.length != 0 && this.ownUser) {
			for (var i = 0; i < this.userPools.length; i++) {
				if (this.userPools[i].uId == this.ownUser.uId) {
					this.userPools[i].seat = 4;
					this.ownUser.chairId = this.userPools[i].chairId;
					break;
				}
			}
			for (var i = 0; i < this.userPools.length; i++) {
				if (this.userPools[i].seat != 4) {
					let userseat: number = (this.userPools[i].chairId - (this.ownUser.chairId - 4) + 7) % 7;
					this.userPools[i].seat = (userseat == 0 ? 7 : userseat);
				}

			}
		}
	}
	public sortUserSeat(user: User) {
		let userseat: number = (user.chairId + Math.abs(4 - this.ownUser.chairId)) % 7;
		user.seat = (userseat == 0 ? 7 : userseat);
	}
}