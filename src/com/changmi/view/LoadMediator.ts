module game {

	export class LoadMediator extends puremvc.Mediator implements puremvc.IMediator {
		private static _instance: LoadMediator

		public static getInstance() {
			if (!this._instance) {
				this._instance = new LoadMediator();
			}
			return this._instance;
		}

		public static NAME: string = "LoadScreenMediator";

		public constructor() {
			super();
		}

		public startAction() {
			this.sendNotification(GameCommand.START_GAME);
		}

		public get loadScreen(): LoadScreen {
			return <LoadScreen><any>(this.viewComponent);
		}
	}
}