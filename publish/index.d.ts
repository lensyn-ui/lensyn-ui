import { PluginFunction } from "vue";

export = LensynUI;

declare class LensynUI {
    public static install: PluginFunction<any>;
}

interface Alarm {
    show(msg: string, subMsg: string, msgType?: string, icon?: string, isAutoClose?: boolean): void;
}

interface Loading {
    show(describe?: string, fixed?: boolean, bgColor?: string): void;
    hide(): void
}

declare module "vue/types/vue" {
    export interface Vue {
        $lensyn: {
            alarm: Alarm,
            loading: Loading
        }
    }
}