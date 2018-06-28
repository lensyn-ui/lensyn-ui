import { PluginFunction } from "vue";

export = LensynUI;

declare class LensynUI {
    public static install: PluginFunction<any>;
    public static registerValidator: (name: string, validator: any) => void;
}

interface Alarm {
    show(msg: string, msgType?: string, subMsg?: string, isAutoClose?: boolean, showTime?: number): void;
}

interface Loading {
    show(describe?: string, fixed?: boolean, bgColor?: string): void;
    hide(): void
}

interface Confirm {
    show(options: any): {hide: (event: any) => void}
}

declare module "vue/types/vue" {
    export interface Vue {
        $lensyn: {
            alarm: Alarm,
            loading: Loading,
            confirm: Confirm
        }
    }
}