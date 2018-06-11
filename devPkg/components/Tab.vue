/***********************************************
* Created by zhangtao on 2018/05/09
************************************************/
<template>
    <div class="tab">
        <div class="tab__scroll-wrapper" :class="{'tab__scroll--scrollable': isScrollable}">
            <div class="tab__prev" @click="handleClickPrev"></div>
            <div class="tab__next" @click="handleClickNext"></div>
            <div class="tab__scroll">
                <div class="tab__list" :style="{transform: listTransform}">
                    <div class="tab__list-item" v-for="item in datas"
                         :key="getItemId(item)"
                         :class="{'tab__list-item--active': isActiveItem(item)}"
                         @click="handleClickTab($event, item)">
                        <div class="tab__list-item-content">
                            {{getItemLabel(item)}}
                        </div>
                        <div v-if="isEnableDeleteTab" class="tab__close-icon" @click="handleClickClose($event, item)"></div>
                    </div>
                    <div class="tab__list-item tab__list-item--create" v-if="isEnableCreateTab" @click="handleClickCreateTab($event)">
                        <div class="tab__list-item-content">
                            <i class="tab__create-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import Widget from "./base/Widget.vue";

    @Component({
        props: {
            datas: {
                type: Array,
                default: () => []
            },

            isEnableCreateTab: {
                type: Boolean,
                default: false
            },

            isEnableDeleteTab: {
                type: Boolean,
                default: false
            },

            idProperty: {
                type: String,
                default: "id"
            },

            labelProperty: {
                type: String,
                default: "name"
            },

            activeTab: {
                type: [String, Number]
            }
        }
    })
    export default class Tab extends Widget {
        widgetName = "tab";

        currentActiveTab = "";
        isScrollable = false;
        currentTranslateX = 0;

        get listTransform() {
            return `translate(${this.currentTranslateX}px)`;
        }

        @Watch("activeTab")
        onActiveTabChange(currentValue) {
            this.currentActiveTab = currentValue;
        }

        @Watch("datas")
        onDatasChange() {
            this.$nextTick(() => {
                this.recalculateScrollableValue();
            });
        }

        mounted() {
            this.currentActiveTab = this.activeTab;
            this.$nextTick(() => {
                this.recalculateScrollableValue();
            });
        }

        scrollToActive() {
            let tab = this.getActiveTabElement();

            if (tab) {
                let left = tab.offsetLeft,
                    width = tab.offsetWidth,
                    createTabWidth = this.getCreateTabWidth(),
                    tabRightSideDistance = left + width + createTabWidth,
                    scrollWidth = this.getScrollWidth(),
                    scrollDistance = Math.abs(this.currentTranslateX);

                if (left < scrollDistance) {
                    this.currentTranslateX = - left;
                } else if (tabRightSideDistance > scrollDistance + scrollWidth) {
                    this.currentTranslateX = -(tabRightSideDistance - scrollWidth);
                }
            }
        }

        recalculateScrollableValue() {
            let list = this.$el.querySelector(".tab__list"),
                scroll = this.$el.querySelector(".tab__scroll");

            if (list !== null && scroll !== null) {
                if (list.offsetWidth > scroll.offsetWidth) {
                    this.isScrollable = true;
                } else {
                    this.isScrollable = false;
                }
            }
        }

        isActiveItem(item) {
            let id = this.getItemId(item);

            return this.currentActiveTab === id;
        }

        getItemId(item) {
            return item[this.idProperty];
        }

        getItemLabel(item) {
            return item[this.labelProperty];
        }

        handleClickTab($event, item) {
            let id = this.getItemId(item),
                old = this.currentActiveTab;

            this.currentActiveTab = id;
            this.emitEvent({action: "clickTab", newTab: id, oldTab: old});
        }

        getScrollWidth() {
            let scroll = this.$el.querySelector(".tab__scroll");

            return scroll.offsetWidth;
        }

        getTabListWidth() {
            let tabList = this.$el.querySelector(".tab__list");

            return tabList.offsetWidth;
        }

        getCreateTabWidth() {
            if (this.isEnableCreateTab) {
                let tab = this.getCreateTabElement();

                if (tab) {
                    return tab.offsetWidth;
                }
            }
            return 0;
        }

        getActiveTabElement() {
            return this.$el.querySelector(".tab__list-item--active");
        }

        getCreateTabElement() {
            return this.$el.querySelector(".tab__list-item--create");
        }

        handleClickPrev() {
            if (this.currentTranslateX < 0) {
                let scrollWidth = this.getScrollWidth(),
                    xDistance = Math.abs(this.currentTranslateX);

                if (xDistance > scrollWidth) {
                    this.currentTranslateX = this.currentTranslateX + scrollWidth;
                } else {
                    this.currentTranslateX = 0;
                }
            }
        }

        handleClickNext(){
            let tabListWidth = this.getTabListWidth(),
                scrollWidth = this.getScrollWidth(),
                visibleWidth = scrollWidth - this.currentTranslateX,
                distance = tabListWidth - visibleWidth;

            if (distance > scrollWidth) {
                this.currentTranslateX = this.currentTranslateX - scrollWidth;
            } else {
                this.currentTranslateX = this.currentTranslateX - distance;
            }
        }

        handleClickCreateTab($event) {
            this.emitEvent({action: "create", $event});
        }

        handleClickClose($event, data) {
            $event.stopPropagation();
            this.emitEvent({action: "close", data, $event});
        }
    };
</script>

