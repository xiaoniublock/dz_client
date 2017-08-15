

module game {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GameProxy";
		/**
         * 改变状态
         */
		public static CHANGE_STATE: string = "change_state";
       
		public constructor() {
			super(GameProxy.NAME);
		}
      
	}
}