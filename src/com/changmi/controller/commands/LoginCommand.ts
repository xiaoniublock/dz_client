/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class LoginCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public static NAME: string = "LoginCommand";


        /**
         * 进入Lobby界面
         */
        public static ENTER_LOBBY: string = "enter_lobby";
        /**
         * 登录
         */
        public static LOGIN: string = "login";

       

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand(LoginCommand.LOGIN, LoginCommand);
            this.facade.registerCommand(LoginCommand.ENTER_LOBBY, LoginCommand);
        }

        public execute(notification: puremvc.INotification): void {
            var loginProxy: LoginProxy = <LoginProxy><any>(this.facade.retrieveProxy(LoginProxy.NAME));
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case LoginCommand.ENTER_LOBBY: {
                   this.sendNotification(ApplicationMediator.ENTER_LOBBY);
                    break;
                }
                case LoginCommand.LOGIN: {
                    loginProxy.Login(data);
                    break;
                }
                
            }
        }
    }
}