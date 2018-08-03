import Vue, {PluginFunction, VueConstructor} from "vue";

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

declare namespace LensynUI {
    export interface Grid {
        resize(): void;
        getAllData(): any[];
        refreshTableColumns(): void;
        getCheckboxSelected(field: string): any[];
        getRadioSelected(field: string): any;
        getActiveRow(): any[];
        setRowBeActiveByRowData(rowDataOrId: any): void;
        setRowBeActive(rowData: any): void;
        hideColumn(field: string): void;
        showColumn(field: string): void
        setEditorFocusByRowData(rowDataOrId: any, field: string): void;
        setEditorFocusByRowNumber(rowNumber: number, field: string): void;
        setFieldBeChecked(field: string, ids: any[], isCheckbox?: boolean): void;
        setFieldBeUnChecked(field: string, ids: any[], isCheckbox?: boolean): void;
    }

    export interface PaginationGrid extends Grid{
        updateGrid(condition: any, isOverride: boolean): void;
        forceUpdateGrid(condition: any): void;
        refreshGrid(): void;
        getQueryCondition(): any;
    }

    export interface TreeGrid extends Grid {
    }

    export class Popup extends Vue {
        showPopup(popupElement: HTMLElement, targetElement?: HTMLElement): void;
    }
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