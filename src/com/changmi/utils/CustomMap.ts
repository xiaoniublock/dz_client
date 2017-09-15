class CustomMap {
	private _record: Object = new Object();
	private _length: number = 0;
	public constructor() {
	}

	/**添加一个对象 */
	public add(key: any, value: any, thisObjOfKey?: any, cover: boolean = false): boolean {
		var added: boolean = false;
		var uid: string = UIDManager.getUid(key, thisObjOfKey);
		if (this._record[uid] == null) {
			this._record[uid] = value;
			this._length++;
			added = true;
		} else if (cover) {
			var valueOld: any = this._record[uid];
			if (valueOld != value) {
				if (valueOld.constructor == CustomMap) {
					(valueOld as CustomMap).gc();
				}
				this._record[uid] = value;
			}
			added = true;
		}

		return added;
	}

	/**更新某个key的值 */
	public update(key: any, value: any, thisObjOfKey?: any): void {
		var uid: string = UIDManager.getUid(key, thisObjOfKey);

		if (this._record[uid] != null) {
			this._record[uid] = value;
		}
	}
	/**获取对象 */
	public get(key: any, thisObjOfKey?: any): any {
		var uid: string = UIDManager.getUid(key, thisObjOfKey);
		return this._record[uid];
	}
	/**删除一个对象*/
	public del(key: any, thisObjOfKey?: any): any {
		var uid: string = UIDManager.getUid(key, thisObjOfKey);
		var value: any = this._record[uid];
		delete this._record[uid];
		if (value != null) {
			this._length--;
		}
		return value;
	}
	/**回收 */
	public gc(): void {
		this.clear();
	}
	/**清理 */
	public clear(): void {
		var uid: string;
		var value: any;
		for (uid in this._record) {
			value = this._record[uid];
			delete this._record[uid];
			if (value.constructor == CustomMap) {
				(value as CustomMap).gc();
			}
		}
		this._length = 0;
	}
	/**按值遍历 */
	public forEach(callBack: (value: any) => boolean, thisObjOfCallBack?: any): void {
		var key: string;
		var value: any;
		for (key in this._record) {
			value = this._record[key];
			if (!callBack.apply(thisObjOfCallBack, [value])) {
				return;
			}
		}
	}
	/**按Key遍历 */
	public for(callBack: (key: string) => boolean, thisObjOfCallBack?: any): void {
		var key: string;
		for (key in this._record) {
			if (!callBack.apply(thisObjOfCallBack, [key])) {
				return;
			}
		}
	}

	public get length(): number {
		return this._length;
	}
}

class UIDManager {
	private static _uid: number = 0;
	public constructor() {
	}
	/**获取某个对象的uid */
	public static getUid(target: any, thisObjOfTarget?: any): string {
		if (target != null) {
			if (target.constructor == String || target.constructor == Number) return target as string;
			if (target["com.once.uid"] == null) {
				UIDManager._uid++;
				target["com.once.uid"] = "com.once.uid" + UIDManager._uid;
			}
			if (thisObjOfTarget != null) {
				if (thisObjOfTarget["com.once.uid"] == null) {
					UIDManager._uid++;
					thisObjOfTarget["com.once.uid"] = "com.once.uid" + UIDManager._uid;
				}
				return thisObjOfTarget["com.once.uid"] + "_" + target["com.once.uid"];
			}
			return target["com.once.uid"];
		}
		throw new Error("uid生成失败");
	}
}