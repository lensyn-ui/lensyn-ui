const SELECTOR_EVENT = "vue-grid.selector-event";
const PAGINATION_EVENT = "vue-grid.pagination-event";
const EDITOR_EVENT = "vue-grid.editor-event";
const EDITOR_VISIBLE_EVENT = "vue-grid.editor-visible-event";
const CLICK_ROW_EVENT = "vue-grid.click-row-event";
const CLICK_TREE_LABEL = "vue-grid.click-tree-label";
const CLICK_SORT = "vue-grid.click-sort";
const HIDE_COLUMN = "vue-grid.hide-column";

export default {
    methods: {
        on(eventName, callback) {
            this.eventBus.$on(eventName, callback);
        },

        emit(...args) {
            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenSelect(callback) {
            this.eventBus.$on(SELECTOR_EVENT, callback);
        },

        triggerSelect(...args) {
            args.unshift(SELECTOR_EVENT);

            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenPagination(callback) {
            this.eventBus.$on(PAGINATION_EVENT, callback);
        },

        triggerPagination(...args) {
            args.unshift(PAGINATION_EVENT);
            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenEditor(callback) {
            this.eventBus.$on(EDITOR_EVENT, callback);
        },

        triggerEditor(...args) {
            args.unshift(EDITOR_EVENT);
            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenEditorVisible(callback) {
            this.eventBus.$on(EDITOR_VISIBLE_EVENT, callback);
        },

        triggerEditorVisible(...args) {
            args.unshift(EDITOR_VISIBLE_EVENT);
            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenClickRow(callback) {
            this.eventBus.$on(CLICK_ROW_EVENT, callback);
        },

        triggerClickRow(...args) {
            args.unshift(CLICK_ROW_EVENT);
            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenClickTreeLabel(callback) {
            this.eventBus.$on(CLICK_TREE_LABEL, callback);
        },

        triggerClickTreeLabel(...args) {
            args.unshift(CLICK_TREE_LABEL);
            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenClickSort(callback) {
            this.eventBus.$on(CLICK_SORT, callback);
        },

        triggerClickSort(...args) {
            args.unshift(CLICK_SORT);
            this.eventBus.$emit.apply(this.eventBus, args);
        },

        listenHideColumn(callback) {
            this.eventBus.$on(HIDE_COLUMN, callback);
        },

        triggerHideColumn(...args) {
            args.unshift(HIDE_COLUMN);
            this.eventBus.$emit.apply(this.eventBus, args);
        }
    }
};