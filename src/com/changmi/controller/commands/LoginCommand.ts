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
         * 登录
         */
        public static LOGIN: string = "login";

       

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand(LoginCommand.LOGIN, LoginCommand);
        }

        public execute(notification: puremvc.INotification): void {
            var loginProxy: LoginProxy = <LoginProxy><any>(this.facade.retrieveProxy(LoginProxy.NAME));
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case LoginCommand.LOGIN: {
                    loginProxy.Login(data);
                    break;
                }
                
            }
        }
    }
}