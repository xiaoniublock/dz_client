module game {
    export class CachePool {
        private static s_pool: CustomMap =new CustomMap();
        /**
         * 添加对象
         */
        public static addObj(name: string, obj: any) {
            if (CachePool.s_pool.get(name) == null){
                CachePool.s_pool.add(name, obj);
            }else{
                CachePool.s_pool.update(name,obj);
            }
        }

        /**
         * 获取对象
         */
        public static getObj(name: string): any {
            return  CachePool.s_pool.get(name);
        }

        /**
         * 清理指定缓存
         */
        public static clear(name: string) {
             CachePool.s_pool.del(name);
        }

        /**
         * 清理所有缓存
         */
        public static clearAll() {
            CachePool.s_pool.gc();
        }
    }
}
