class UserUtils {
	private static _instance:UserUtils
    /**存取所有桌上玩家信息 */
    private userPools:Array<User>=[];
	private ownUser:User;
	public static getInstance(){
    if(!this._instance){
        this._instance = new UserUtils();
    }
    return this._instance;
	}
	public initUsers(users:Array<User>):void{
		this.userPools=users;
	}
	public initUser(user:User):void{
		this.userPools.push(user);
	}
	public getUsers():Array<User>{
		return this.userPools;
	}
	public getUserFromIndex(index:number):User{

		return this.userPools[index];
	}
	public saveOwnUser(user:User){
		this.ownUser=user;
	}
	public sortUsersSeats(){
		let ownIndex:number;
		if(this.userPools.length!=0&&this.ownUser){
			for(var i=0;i<this.userPools.length;i++){
				if(this.userPools[i].userName==this.ownUser.userName){
					this.userPools[i].seat=4;
					ownIndex=i+1;
					break;
				}
			}
			for(var i=0;i<this.userPools.length;i++){
				if(this.userPools[i].seat!=4){
					let userseat:number=(i+1+Math.abs(4-ownIndex))%7;
					this.userPools[i].seat=(userseat==0?7:userseat);
				}
				
			}
		}
	}
}