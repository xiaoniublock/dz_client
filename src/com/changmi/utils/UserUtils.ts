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
	public popUser(uId: string): number {
		for (var i = 0; i < this.userPools.length; i++) {
			if (this.userPools[i].uId == uId) {
				let seat=this.userPools[i].seat;
				this.userPools.splice(i, 1);
				return seat;
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
					this.userPools[i].seat = 3;
					this.ownUser.chairId = this.userPools[i].chairId;
					break;
				}
			}
			for (var i = 0; i < this.userPools.length; i++) {
				if (this.userPools[i].seat != 3) {
					let userseat: number = (this.userPools[i].chairId - (this.ownUser.chairId - 3) + 7) % 7;
					this.userPools[i].seat =  userseat;
				}

			}
		}
	}
	public sortUserSeat(user: User) {
		let userseat: number = (user.chairId + Math.abs(3 - this.ownUser.chairId)) % 7;
		user.seat = userseat;
	}
}