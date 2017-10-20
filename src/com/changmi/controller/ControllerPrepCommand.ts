

module game {

    export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public execute(notification: puremvc.INotification): void {
            (new LobbyCommand()).register();
            (new GameCommand()).register();
            (new LoginCommand()).register();
        }
    }
}