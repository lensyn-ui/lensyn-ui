import { PluginFunction } from "vue";

export = LensynUI;

declare class LensynUI {
    public static install: PluginFunction<any>;
}

interface Alarm {
    show(msg: string, subMsg: string, msgType?: string, icon?: string, iconClose?: string): void;
}

declare module "vue/types/vue" {
    export interface Vue {
        $lensyn: {
            alarm: Alarm
        }
    }
}