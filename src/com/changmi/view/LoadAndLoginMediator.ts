module game {

    export class LoadAndLoginMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "LoadAndLoginMediator";

        /**游客登录 */
        public static TOURIST_LOGIN: string = "tourist_login";

        private loginModel: Login = new Login();

        public constructor(viewComponent: any) {
            super(LoadAndLoginMediator.NAME, viewComponent);

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.LoadAndLoginScreen.currentX = this.LoadAndLoginScreen.lable_progress.x;
            this.LoadAndLoginScreen.load_progress.maximum = 100;//设置进度条的最大值
            this.LoadAndLoginScreen.load_progress.minimum = 0;//设置进度条的最小值
            RES.loadGroup("preload");

            this.LoadAndLoginScreen.btn_accountLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.accountLogin, this);
            this.LoadAndLoginScreen.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.LoadAndLoginScreen.btn_register.addEventListener(egret.TouchEvent.TOUCH_TAP, this.register, this);
            this.LoadAndLoginScreen.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next, this);
            this.LoadAndLoginScreen.btn_complete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.complete, this);
            this.LoadAndLoginScreen.btn_forget.addEventListener(egret.TouchEvent.TOUCH_TAP, this.forget, this);
            this.LoadAndLoginScreen.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.login, this);
            this.LoadAndLoginScreen.btn_touristLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touristLogin, this);


        }

        public listNotificationInterests(): Array<any> {
            return [
                LoadAndLoginMediator.TOURIST_LOGIN
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case LoadAndLoginMediator.TOURIST_LOGIN: {
                    this.LoadAndLoginScreen.dismissProgress();
                    this.sendNotification(LoginCommand.ENTER_LOBBY);
                    break;
                }
            }
        }

        public login(event: egret.TouchEvent) {
            let account = this.LoadAndLoginScreen.et_phone.text;
            let password = this.LoadAndLoginScreen.et_password.text;
            if (account == "" || password == "") {
                game.TextUtils.showTextTip("账户密码不能为空！！！");
                return;
            }
            this.loginModel.account = account;
            this.loginModel.password = password;
            this.sendNotification(LoginCommand.LOGIN, this.loginModel);
        }
        public touristLogin(event: egret.TouchEvent) {
            this.LoadAndLoginScreen.showProgress();
            //发送登录
            this.sendNotification(LoginCommand.TOURIST_LOGIN);
            // SoundManager.getIns().playSound("button_mp3");
        }
        public accountLogin(event: egret.TouchEvent) {
            this.LoadAndLoginScreen.skin.currentState = "login";
        }
        public close(event: egret.TouchEvent) {
            this.LoadAndLoginScreen.skin.currentState = "closeGroup";
        }
        public register(event: egret.TouchEvent) {
            this.LoadAndLoginScreen.skin.currentState = "register";
        }
        public next(event: egret.TouchEvent) {
            if (this.LoadAndLoginScreen.skin.currentState == "register") {
                this.LoadAndLoginScreen.skin.currentState = "smscheck";
            } else if (this.LoadAndLoginScreen.skin.currentState == "resetPassword") {
                this.LoadAndLoginScreen.skin.currentState = "sms_reset";
            }
        }
        public complete(event: egret.TouchEvent) {
            this.LoadAndLoginScreen.skin.currentState = "login";
            this.LoadAndLoginScreen.et_sms.text = "";
        }
        public forget(event: egret.TouchEvent) {
            this.LoadAndLoginScreen.skin.currentState = "resetPassword";
        }

        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (event.groupName == "preload") {
                //      RES.loadGroup("sound");
                // }
                // if (event.groupName == "sound") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                // SoundManager.getIns().playBg("main_bgm_mp3");
                this.LoadAndLoginScreen.showEnterButton();
            }
        }
        /**
        * 资源组加载出错
        * Resource group loading failed
        */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //ignore loading failed projects
            this.onResourceLoadComplete(event);
        }
        /**
       * preload资源组加载进度
       * loading process of preload resource
       */
        private onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == "preload") {
                this.LoadAndLoginScreen.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        }
        /**
       * 资源组加载出错
       *  The resource group loading failed
       */
        private onItemLoadError(event: RES.ResourceEvent): void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }
        public get LoadAndLoginScreen(): LoadAndLoginScreen {
            return <LoadAndLoginScreen><any>(this.viewComponent);
        }

    }
}