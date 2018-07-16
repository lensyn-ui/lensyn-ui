import Util from "../helper/GridUtil";

const SCROLL_DIRECTION = {
    UP: "up",
    DOWN: "down"
};

const SCROLL_PAGINATION_DELAY = 200;

let ScrollPaginationMixin = {
    props: {
        isEnableScrollPagination: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        if (this.isEnableScrollPagination) {
            this.initPaginationMethods();
            this.bindScrollPaginationEventListener();
        }
    },

    beforeDestroy() {
        if (this.isEnableScrollPagination) {
            this.goNextPageByScroll = null;
            this.goPreviousPageByScroll = null;
        }
    },

    methods: {
        initPaginationMethods() {
            this.goNextPageByScroll = Util.debounce(() => {
                this.goNextPage();
            }, SCROLL_PAGINATION_DELAY);

            this.goPreviousPageByScroll = Util.debounce(() => {
                this.goPreviousPage();
            }, SCROLL_PAGINATION_DELAY);
        },

        bindScrollPaginationEventListener() {
            this.listenerContentVerticalScroll(this.handlePaginationGridContentScroll);
        },

        handlePaginationGridContentScroll({$event, contentWrapper}) {
            let direction = this.getScrollDirection($event);
            $event.stopPropagation();

            if (direction === SCROLL_DIRECTION.DOWN) {
                if (this.isContentScrollToBottom(contentWrapper)) {
                    this.goNextPageByScroll();
                }
            } else {
                if (!this.isAppendStoreData && this.isContentScrollToTop(contentWrapper)) {
                    this.goPreviousPageByScroll();
                }
            }
        },

        getScrollDirection($event) {
            if (Util.isFirefox()) {
                return $event.detail > 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
            }
            return $event.wheelDelta < 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
        },

        isContentScrollToBottom(contentElement) {
            return contentElement.offsetHeight + contentElement.scrollTop === contentElement.scrollHeight;
        },

        isContentScrollToTop(contentElement) {
            return contentElement.scrollTop === 0;
        }
    }
};

export default ScrollPaginationMixin;