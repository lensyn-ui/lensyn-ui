/*******************************************************************************
 * Created by deming-su on 2017/10/25                                          *
 * Modify by zhangtao on 2017/11/21 新增操作列的权限控制                       *
 * 插件必须对象为：listObj 插件数据对象列表，propObj 数据展示对应关系          *
 * propObj 数据对象属性：n 展示列表列名 v 对应数据列表key w 列宽百分比数字     *
 *         t 当前列的类型（非必传 默认为txt btn为按钮类型 icon为字体按钮类型） *
 *         d 为是否可以编辑（非必传 true不可编辑 false可编辑）                 *
 * listObj 数据对象属性：必须包括id为整个数据唯一，pId为父级id                 *
 *         pId 可以为null，undefined，'firstLayer' ,opeEdit是否编辑状态        *
 * operateConfig 操作列的配置: isShowOperate 如果配置为 false 则所有操作为空   *
 *               如果配置为 true 则根据 operateList 进行配置，如果 operateList *
 *               为 undefined，则显示所有操作，否则根据 operateList 中列出的   *
 *               操作显示 operateList 的取值有 deleteRow、editRow、stepCRow、  *
 *               stepRow                                                       *
 *******************************************************************************/

<template>
    <div :style="[tableCls]">
        <div :style="[headerCls]">
            <span v-for="item in propObj" :style="[thCls, {'width': item.w + '%', 'text-align': item.v === 'opt' ? 'right' : 'left'}]">{{item.n}}</span>
        </div>
        <div :style="[bodyCls]" ref="tableBox">
            <div v-for="item in treeArray" :style="[rowCls, item.edit ? editRowCls : {}]" :key="item.id" :row-id="item.id">
                <div v-for="(o, i) in item.d" :style="[columnCls, {'width': o.w + '%', 'padding-left': i === 0 ? (40+item.layer*20)+'px' : '20px'}]">
                    <div :style="columnBoxCls">
                        <!-- 第一列才显示对应的图标 -->
                        <template v-if="isIconColumn(o, i)">
                            <i :now-id="item.id" v-if="item.hasChild" :style="[item.checked ? openIconCls : closeIconCls]" @click="collapseRowEvt"></i>
                            <i :now-id="item.id" :style="[!item.hasChild ? childFileCls : item.checked ? openDirCls : closeDirCls]"></i>
                        </template>

                        <!-- 操作列才渲染对应的图标 -->
                        <template v-if="isOperateColumn(o, i) && isShowOperateColumn()">
                            <i :now-id="item.id" v-if="canShowOperate(item, o, 'deleteRow')" :style="[deleteIconCls]" @click="deleteRowEvt"></i>
                            <i :now-id="item.id" v-if="canShowOperate(item, o, 'editRow')" :style="[editIconCls]" @click="editRowEvt"></i>
                            <i :now-id="item.id" v-if="canShowOperate(item, o, 'stepCRow')" :style="[stepCIconCls]" @click="stepCRowEvt"></i>
                            <i :now-id="item.id" v-if="canShowOperate(item, o, 'stepRow')" :style="[stepIconCls]" @click="stepRowEvt"></i>
                            <i :now-id="item.id" v-if="canShowOperate(item, o, 'saveRow')" :style="[saveIconCls]" @click="saveRowEvt"></i>
                        </template>

                        <!--TODO 判断过多，需要在初始化数据时进行组装优化-->
                        <span v-if="o.t !== 'btn' && o.t !== 'icon'"
                              :style="[(item.edit && o.f !== 'opt' && !o.d) ? editTxtCls : txtCls, i === 0 ? treeTxtCls : '']"
                              :now-idx="i" :now-name="o.f" :node-type="o.f === 'opt' ? 'opt' : 'txt'" :node-val="o.f !== 'opt' ? o.v : ''"
                              :contenteditable="item.edit && o.f !== 'opt' && !o.d">{{o.f !== 'opt' ? o.v : ""}}</span>
                        <span v-if="o.t === 'btn'"
                              :style="[item.edit ? editTxtCls : txtCls]"
                              :now-idx="i" :now-name="o.f" :node-type="'txt'" :node-val="o.v">
                            {{o.v}}<i v-if="item.edit" :now-id="item.id" :now-name="o.f" :style="[colBtnCls]" @click="modalColEvt"></i></span>
                        <span v-if="o.t === 'icon'"
                              :style="[item.edit ? editTxtCls : txtCls]"
                              :now-idx="i" :now-name="o.f" :node-type="'txt'" :node-val="o.v"><i :style="colIconCls" v-html="o.v"></i>
                            <i v-if="item.edit" :now-id="item.id" :now-name="o.f" :style="[colBtnCls]" @click="modalColEvt"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div :style="editOptCls" v-if="showPrompt"><span :style="editMsgCls">{{promptMsg}}</span></div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props: {
            listObj: {
                required: true,
                type: Array
            },
            propObj: {
                required: true,
                type: Object
            },
            modalObj: {
                type: Object
            },
            operateConfig: {
                type: Object
            }
        },

        /**
         * 页面参数设置
         * @returns {{
         * tableCls: object 整体表格样式使当前展示为相对父级元素全屏,
         * headerCls: object 表头样式 相对定位,
         * thCls: object 表头单元格样式,
         * bodyCls: object 表体样式,
         * rowCls: object 行样式,
         * editRowCls: object 当前编辑行样式,
         * columnCls: object 列样式,
         * columnBoxCls: string 列盒子区域样式,
         * treeTxtCls: object 单元格第一列样式,
         * txtCls: object 单元格文本样式,
         * editTxtCls: object 单元格编辑样式,
         * openDirCls: object 展开文件夹样式,
         * closeDirCls: object 收起文件夹样式,
         * childFileCls: object 无子节点样式,
         * openIconCls: object 展开文件夹时三角形样式,
         * closeIconCls: object 收起文件夹时三角形样式,
         * saveIconCls: object 保存按钮样式,
         * editIconCls: object 编辑按钮样式,
         * stepIconCls: object 插入兄弟节点样式,
         * stepCIconCls: object 插入子节点样式,
         * deleteIconCls: object 删除节点样式,
         * colBtnCls: object 编辑列按钮样式,
         * newArray: Array 页面组装后的缓存元数据,
         * treeArray: Array 页面展示树数据对象,
         * initTimeStamp: number 页面进行操作时打点时间戳
         * }}
         */
        data() {
            return {
                tableCls: {position: 'relative', width: '100%', height: '100%'},
                headerCls: {position: 'relative', height: '40px', overflow: 'hidden', border: 'solid 1px #dcdcdc', 'background-color': '#F5F6FA'},
                thCls: {'position': 'relative', 'display': 'inline-block', 'vertical-align': 'middle', 'height': '40px', 'line-height': '40px', 'font-size': '1.2rem', 'padding': '0 20px', 'color': '#999'},
                bodyCls:{position: 'absolute', top: '40px', right: 0, bottom: 0, left: 0, 'overflow-x': 'hidden', 'overflow-y': 'auto', 'border-right': 'solid 1px #dcdcdc', 'border-bottom': 'solid 1px #dcdcdc', 'border-left': 'solid 1px #dcdcdc', 'background-color': '#fff'},
                rowCls: {position: 'relative', 'border-bottom': 'solid 1px #dcdcdc'},
                editRowCls: {'background-color': '#CCE2FF'},
                columnCls: {'position': 'relative', 'display': 'inline-block', 'vertical-align': 'middle', 'height': '40px', 'line-height': '40px', 'font-size': '1.2rem', 'padding': '0 0 0 20px', 'color': '#333', 'overflow': 'hidden'},
                columnBoxCls: "position: relative; width: 100%; height: 100%; overflow: hidden;",
                treeTxtCls: {'position': 'relative', 'float': 'left', 'width': '100%', 'height': '24px', 'margin': '8px 6px 8px 28px', 'line-height': '24px', 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden'},
                txtCls: {'position': 'relative', 'float': 'left', 'width': '100%', 'height': '24px', 'margin': '8px 0', 'line-height': '24px', 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden'},
                editTxtCls: {'position': 'relative', 'float': 'left', 'width': '100%', 'margin': '8px 0', 'padding': '0 6px', 'height': '24px', 'line-height': '24px', 'border-solid': 'solid 1px #dcdcdc', 'background-color': '#fff', 'overflow': 'hidden'},
                openDirCls: {'position': 'absolute', 'top': 0, 'left': '12px', 'width': '12px', 'height': '40px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAu0lEQVQ4T62TYQ3CMBCFvznAAZMwFIACCAoIDnBAUAA4QMJwMBwgAQmbAshLekvZSrrRXdI/zd3rd++uGYmRJdYzqcAF2AGzANUN2IdojeAAnCPtSERH8bBcEyiBzQg/roAebT2ogKUnoBd09yteRmMEJtAAK6AA5hGiO/DsCpxc0XFAO1ug9AVyYO0MCk3C11SLIv3yQA7rUqOMxUL4voB2QK6+Y5VuH2ycLYGQ6wHFvZRJV/kfgPTP9AFHvhwR/tKeNQAAAABJRU5ErkJggg==) center center / 12px no-repeat'},
                closeDirCls: {'position': 'absolute', 'top': 0, 'left': '12px', 'width': '12px', 'height': '40px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAV0lEQVQ4T2NkoBAwUqifAWbABAYGhnwshk1kYGAowGcJzID/eBQFMDAwfECT/8jAwHABJEaMAbjMPsDAwOBIiQFgB4waMKzCAFdSxpeKwcmcapmJ7EwJALqTEhGcgEvhAAAAAElFTkSuQmCC) center center / 12px no-repeat'},
                childFileCls: {'position': 'absolute', 'top': 0, 'left': '12px', 'width': '12px', 'height': '40px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwklEQVQ4T8WTYQ3CMBBG3xSABFAADgAHSAAHSEACDgAnSAAHSAAFkLdsS5fcSgk/uGRpsvZ7991dW/FjVIn+AdwB1ygWwAnYppstYAkcgHnG0As4A64dJAXsAUFDodDzutCp5+sfhsISQC0CdsAKuH4DUDRuABvA7xIB7MNooI6nWRU2jkNArpROmAOsgVngwMY5BSPrwNomAcD74ag/AjKT7LayDv4HOALTkvTNTezdA3XON+p+xLy17yZ9jYXJ+8fexKg1EXektHMAAAAASUVORK5CYII=) center center / 12px no-repeat'},
                openIconCls: {'position': 'absolute', 'top': 0, 'left': 0, 'width': '12px', 'height': '40px', 'cursor': 'pointer', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjElEQVQ4T6WTbQ2AMAwFDwUgAQngAAlIQQJIwAkOCA6QRB4B0vC1FfpvWe66t7QJPyv5yfNFUAA5MKi5VyB4BHqg9Qp2OAM6r8DCauwSnGEJFKGJiXAHi5uAKiR4gqMEb3BQEIIlmIHyLkIMvA/vOkN2kDzwwVpBDUhia/1pU7pPt/PlBZ/2yrsLlyYL6o8UESIkx2MAAAAASUVORK5CYII=) center center / 8px no-repeat'},
                closeIconCls: {'position': 'absolute', 'top': 0, 'left': 0, 'width': '12px', 'height': '40px', 'cursor': 'pointer', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkElEQVQ4T6XT2w3CMBBE0ZvOQgl0ACXQQegEOqEE6CAlhAqCRvJKlmWza2f/53j8moAHcGFwJmBPyA3Yeh0DlHsDp14kBww5A2u0SQkop22oiRq5UwMMUZOXJ7QAy13TATcdD1BwAe4tIQL8beEBw1v4AnPkJmoNwmGdSwl80srhJ50D3eG8wXP0R6rBoe/8A6WtJxHVXgMdAAAAAElFTkSuQmCC) center center / 8px no-repeat'},
                saveIconCls: {'float': 'right', 'width': '16px', 'height': '40px', 'cursor': 'pointer', 'margin-right': '5px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvklEQVQ4T2NkoBAwgvQLTL2VwMjImMDwn0GBgZHhAV4zQWoYGC78Z/i/4UO22gKwAULTbi14l6WWIDT1dsO7bNUGbAYITbtt8fsf521Wxu+5IDUwPRADoBrxGSAw7XbBXwbm7az//0aCDYDqoZ8BGF4g1QWwcEH3LooXBKbfdmD6x+CALxb+MTEc+JCpegBrGJCSJEYNQCQ+lKRMSiAKTr294X22agAiMzEwBjAwMvATZch/ho8omYkoTTgUAQAZt7MR9u8uaAAAAABJRU5ErkJggg==) center center / 12px no-repeat'},
                editIconCls: {'float': 'right', 'width': '16px', 'height': '40px', 'cursor': 'pointer', 'margin-right': '5px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/ElEQVQ4T9WSMW4CMRBF/wdapIUTRChsnQNQRByAK7BFKrahShlFOQGNt94D5BAgcQCgNKTJAcANTVA80SBZQmizJmVcWdb85/9nhvjjSYx9IDmDwMlXK2NibEZyXMehcL3P76cqbqCRhTvBV3aK7fww6T/GjFyKQ61qbwJUibtmN/PwZRRQJ3Z5uqoFxMQa5VdATKwRtJmVgLb5GDTx/ezydBQaFjKrbX0Lza8EJMa+kRweJv2BFl+Lo4BuYUsvmJN8EpE9gJfw8+UIdfyVDjqF3RFYesHn6dR6P057m+s9qY0QW6pohH8G0BGBIiDcLdbPNV7uPLBweVr+ANqg08EC2T2+AAAAAElFTkSuQmCC) center center / 12px no-repeat'},
                stepIconCls: {'float': 'right', 'width': '16px', 'height': '40px', 'cursor': 'pointer', 'margin-right': '5px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmElEQVQ4T2NkoBAwUqifgXYGCE69/YCRkUEe2YX//zM8fJ+tqoAsBnaBQP99gQ+Fih/I8Q7YAJBt/5kYEj5kqh4g1RCwAULTbv8Ha2RkaHiXqdpIiiGoBoB1/l/4LkstQXDa7Q+MDAz8uAz7x8BQ+CFLdQKqAf8ZJ77LVikg2QUUhwHFsYDNySSlA1L8jK6WdkmZWFdR7AIAOp85EdDO7QwAAAAASUVORK5CYII=) center center / 12px no-repeat'},
                stepCIconCls: {'float': 'right', 'width': '16px', 'height': '40px', 'cursor': 'pointer', 'margin-right': '5px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA6ElEQVQ4T7WSzQ2CQBSE520sYLUBMZE7JWgH2gFX8GIHUoIX4Kh2YAnagWfXRCsgFED2mSXiT4RFY9zb7s58mfdD+PFQ5e/FKoIA23ganU0eDC7PmleAxc2AzwJ+Hri7WkBbJd1E7ZgQNQKMALCUwPBYYNoIkKka2VIQ85KJ5v8roZco6wRMOk0Y/y9B2xSa/u97UAlkcprk4XBr7jI9O+CiX2fOQ3dv3u8AGR89AlYgSCJaa2AvNEYgLOoAWeiW3gcgUXMCopv4wMxrAXI+BlSRhS78bOaWILMbZYqaU2neevBtM38GXAGl+1wRYoqvPwAAAABJRU5ErkJggg==) center center / 12px no-repeat'},
                deleteIconCls: {'float': 'right', 'width': '16px', 'height': '40px', 'cursor': 'pointer', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABI0lEQVQ4T8VTO1LDMBDdVazU0DGD5aECu/MRfIQcwUfIEXKEHIEj5Ag+gjsZqkwcZuhIHREts8b2SI4CaRjU7dunt3+EwNNKPgPAg+tCgjrdm+WUjlNAK1kiwk26M2vX1yRyiWS3T+1p4wnrOCoiABpAi1gSQj2zVLvEk8AcCXJBxNmND3UyX/VWCQCeM1TelDuW0MRyHaox2KNkvsp2xy7wKKCVrLLWFAxyVkx4vZc5249vph6wzu9wwwI9gfvDH7L9Z+UF+BMBtwdDtIsZBHvA07C2ctMNCXSYEMV5E/9d4EXNFpbwcFUJ/WT8PYijAgXmfAMsxjuv774PKnuH7Yg5pZ4LAC5+20aeFgFtOFNPgI1GST6gjx9ugF23aWu6DeX3BYnr+8aCIdC5AAAAAElFTkSuQmCC) center center / 12px no-repeat'},
                colBtnCls: {'position': 'absolute', 'top': '1px', 'cursor': 'pointer', 'right': '1px', 'width': '32px', 'height': '22px', 'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4T+3SwQ3CUAwD0NcN2IR2AzYCNoAJgA26CYwAmzACspSWnvuvzSnKt51vK53G6hr5NgFzBj2OeONRwe5wq/6Mb/UX7HENfgoxxAxTQwndSzSziJ5wwLNw4QwtAh/0k0AsZMML48JCfpHK29JC8LEyW1h9T9sh/Q9pdYg/fmAYEQPJ1EwAAAAASUVORK5CYII=) center center / 16px no-repeat #fff', 'border-left': 'solid 1px #dcdcdc'},
                colIconCls: 'position: relative; height: 24px; width: 100%; overflow: hidden; display: block; line-height: 24px;',
                editOptCls: "position: absolute; bottom: 0; left: 0; width: 100%; text-align: center;",
                editMsgCls: "margin: 15px auto; display: block; max-width: 380px; padding: 5px; border: solid 1px #ef2828; background-color: #fbdfdf; border-radius: 4px; color: #353535;",
                newArray: [],
                treeArray: [],
                initTimeStamp: 0,
                promptMsg: '',
                showPrompt: false,
                promptTimer: null,
                operateJudgeMap: null
            }
        },
        watch: {
            'modalObj': function (val) {
                let me = this;
                /* 当插件事件为点击按钮时，从外部控件返回数据方法 */
                me.$nextTick(() => {
                    /* 得到改变数据的数据行id和列名 */
                    let id = val.obj.id;
                    let col = val.col;
                    let obj = me.treeArray;
                    /* 遍历展示树数据查询相对行进行数据改变操作 */
                    for(let i = 0;i < obj.length;i ++) {
                        let d = obj[i];
                        if(d.id === id) {
                            /* 改变对应列的数值 */
                            d.d.map(o => {
                                if(o.f === col) o.v = val.val;
                            });
                            /* 强制刷新数据 */
                            me.$set(me.treeArray, i, d);
                            break;
                        }
                    }
                });
            },
            'listObj': function (val) {
                let me = this;
                /* 页面初始化时，页面进行数据初始化 */
                me.$nextTick(() => {
                    me.newArray = [];
                    me.initTimeStamp = Date.now();
                    /* 当进入插件的数据列表对象不为空时，需要给列表数据添加对应属性 */
                    if(val && val.length > 0) me.addTreeProps(val, 0);
                });
            }
        },

        created: function () {
            this.operateJudgeMap = {
                'deleteRow': this.canDeleteRow,
                'editRow': this.canEditRow,
                'stepCRow': this.canStepCRow,
                'stepRow': this.canStepRow,
                'saveRow': this.canSaveRow
            };
        },
        methods: {
            /**
             * 判断是否显示操作列
             * @returns {boolean} true 显示操作列，false 不显示操作列
             */
            isShowOperateColumn() {
                return !this.operateConfig || this.operateConfig.isShowOperate;
            },

            /**
             * 判断是否为操作列，当前为列的字段为 opt 时即为操作列
             * @param {object} column - 对应的列对象
             * @returns {boolean} true 为操作列，false 为非图标列
             */
            isOperateColumn(column) {
                return column.f === "opt";
            },

            /**
             * 判断是否是图标列，当前是下标为 0 即第一列的时候为图标列
             * @param {object} column - 对应的列
             * @param {number} index - 对应列的下标
             * @returns {boolean} true 为图标列， false 为非图标列
             */
            isIconColumn(column, index) {
                return index === 0;
            },
            /**
             * 判断是否可以显示操作
             * @param {object} rowData - 对应的行数据
             * @param {object} row - 对应的行配置
             * @param {string} operate - 对应的操作，取值为 deleteRow、editRow、stepCRow、stepRow
             * @returns {boolean} true 显示图标， false 不显示图标
             */
            canShowOperate(rowData, row, operate) {
                return this.operateJudgeMap[operate].call(this, rowData, row);
            },

            /**
             * 判断是否可以显示删除行的图标
             * @param {object} rowData - 对应的行数据
             * @param {object} row - 对应的行配置
             * @returns {boolean} true 显示图标， false 不显示图标
             */
            canDeleteRow(rowData, row) {
                return !this.haveConfigOperateList() || this.haveConfigOperate("deleteRow");
            },

            /**
             * 判断是否可以显示编辑行的图标
             * @param {object} rowData - 对应的行数据
             * @param {object} row - 对应的行配置
             * @returns {boolean} true 显示图标， false 不显示图标
             */
            canEditRow(rowData, row) {
                return !rowData.edit && (!this.haveConfigOperateList() || this.haveConfigOperate("editRow"));
            },

            /**
             * 判断是否显示 stepCRow 图标
             * @param {object} rowData - 对应的行数据
             * @param {object} row - 对应的行配置
             * @returns {boolean} true 显示图标， false 不显示图标
             */
            canStepCRow(rowData, row) {
                return !rowData.edit && rowData.layer < 3 && 
                       (!this.haveConfigOperateList() || this.haveConfigOperate("stepCRow"));
            },

            /**
             * 判断是否显示 stepRow 图标
             * @param {object} rowData - 对应的行数据
             * @param {object} row - 对应的行配置
             * @returns {boolean} true 显示图标， false 不显示图标
             */
            canStepRow(rowData, row) {
                return !rowData.edit && (!this.haveConfigOperateList() || this.haveConfigOperate("stepRow"));
            },

            /**
             * 判断是否显示保存行的图标
             * 当允许编辑行且当前处理正在编辑行的时候，显示保存图标
             * @param {object} rowData - 对应的行数据
             * @param {object} row - 对应的行配置
             * @returns {boolean} true 显示图标， false 不显示图标
             */
            canSaveRow(rowData, row) {
                return rowData.edit;
            },

            haveConfigOperateList: function () {
                return this.operateConfig && this.operateConfig.operateList;
            },

            /**
             * 判断是否用某操作
             * @param {string} operateName - 操作名
             * @returns {boolean} true 配置有操作， false 配置中没有该操作
             */
            haveConfigOperate(operateName) {
                return this.operateConfig.operateList.indexOf(operateName) !== -1;
            },

            addTreeProps(arr) {
                let me = this;
                let prop = me.propObj;
                let temp = [];
                /**
                 *  遍历插入数据，为每行数据添加遍历属性（d[0].v 显示值 d[0].w 单元格宽度 d[0].f 当前列数据key d[0].t 当前单元格类型（btn为操作按钮））
                 *  edit 编辑属性
                 *  hasChild 是否有子节点属性（进入页面时，为了减少页面渲染时长默认所有节点都是有子节点的）
                 *  pid 父节点，如果父节点为空或则时firstLayer则为第一层否则为其它层
                 *  checked 是否为选中展开标志，默认不展开
                 */
                arr.map(it => {
                    it.edit = it.opeEdit || false;
                    it.checked = false;
                    /* 如果为第一层节点设置pid为firstLayer */
                    it.pid = (!it.pId || it.pId === 'firstLayer') ? 'firstLayer' : it.pId;
                    if(it.pid === 'firstLayer') it.layer = 0;
                    it.d = [];
                    prop.map(obj => {
                        it.d.push({
                            v: it[obj.v], w: obj.w, f: obj.v, t: obj.t, d: obj.d
                        });
                    });
                    temp.push(it);
                });
                me.newArray = temp;
                /* 遍历数据组装第一层数据对象 */
                me.formatArray('TreeInitial', 'firstLayer');
            },
            /**
             * 遍历设置显示树数组
             * type 当前操作类型 TreeInitial 初始化树 expand 展开树节点 collapse 收起节树点
             * name 当前展示pid字符串
             * idx 插入元素节点
             * layer 当前元素展示层级
             */
            formatArray(type, name, idx, layer, cb) {
                let me = this;
                let obj = me.newArray;
                /* 如果为初始化页面树结构，则根据传递的第一层名称进行筛选加入就可以 */
                if(type === 'TreeInitial') {
                    let temp = [];
                    me.treeArray = [];
                    obj.map(it => {
                        if(it.pId === name) {
                            it.hasChild = me.hasChildrenNode(it.id);
                            temp.push(it);
                        }
                    });
                    me.treeArray = temp;
                } else {
                    /* 如果为页面节点点击展开事件，需要配合页面层级ID查询子节点，并给所有子节点加pid用来唯一标识，准备为以后的收起事件添加遍历唯一标志，规则为父节点的pid+父节点的id */
                    let id = name.split('&');
                    id = id[id.length - 1]+'';
                    if(type === 'expand') {
                        obj.map(it => {
                            if(it.pId+'' === id) {
                                /* 因为数据同源，所以需要设置默认选中状态为false(以后可以优化加载子节点，如果子节点的状态为true) */
                                it.hasChild = me.hasChildrenNode(it.id);
                                it.checked = false;
                                it.layer = layer;
                                it.pid = name;
                                me.treeArray.splice(idx, 0, it);
                                idx ++;
                            }
                        });
                    } else if(type === 'collapse') {
                        /* 节点收起功能，需要删除功能标识的节点和节点下的子节点 */
                        let arr = me.treeArray;
                        let temp = [];
                        arr.map(it => {
                            /* 判断当前节点的pid是否为点击节点的pid+id为前缀的字符串，如果是则删除，不是保留 */
                            let txt = it.pid.replace(name, '');
                            if(txt !== '' && txt.indexOf('&') !== 0) {
                                temp.push(it);
                            }
                        });
                        me.treeArray = temp;
                    } else {}
                }
                cb && cb();
                console.log("Format Array Cost Time :", Date.now() - me.initTimeStamp);
            },
            /* 判断当前节点是否有子节点 */
            hasChildrenNode(id) {
                let flag = false;
                for(let i = 0;i < this.newArray.length;i ++) {
                    if(this.newArray[i].pId+'' === id+'') {
                        flag = true;
                        break;
                    }
                }
                return flag;
            },
            /* 判断当前是否存在编辑的行数据 */
            hasEditNode() {
                let flag = false;
                let me = this;
                for(let i = 0;i < me.treeArray.length;i ++) {
                    if(me.treeArray[i].edit) {
                        flag = true;
                        me.promptBoxFunc("当前第" + i + "正在编辑，请保存后再进行其它操作");
                        break;
                    }
                }
                return flag;
            },
            /* 提示框方法 */
            promptBoxFunc(msg) {
                let me = this;
                me.showPrompt = true;
                me.promptMsg = msg;
                if(me.promptTimer) {
                    clearTimeout(me.promptTimer);
                    me.promptTimer = null;
                }
                me.promptTimer = setTimeout(() => {
                    clearTimeout(me.promptTimer);
                    me.promptTimer = null;
                    me.showPrompt = false;
                }, 1800);
            },
            /* 展开和收起节点事件 */
            collapseRowEvt(evt) {
                let me = this;
                if(me.hasEditNode()) {
                    return false;
                }
                /* 得到点击时时间戳，得到点击对象ID（避免点击ID数据对象是数字需要转数字为字符串）和当前选中状态 */
                me.initTimeStamp = Date.now();
                let id = evt.target.getAttribute('now-id');
                for(let i = 0;i < me.treeArray.length;i ++) {
                    let it = me.treeArray[i];
                    if(id === it.id+'') {
                        it.checked = !it.checked;
                        /* 设置点击元素的状态，强制刷新数据状态 */
                        me.$set(me.treeArray, i, it);
                        /* 重新设置元素对象的值，为子元素设置唯一pid字符串 */
                        me.formatArray((it.checked ? 'expand' : 'collapse'), it.pid + '&' + it.id, i+1, it.layer + 1);
                        break;
                    }
                }
            },
            /* 删除行事件 */
            deleteRowEvt(evt) {
                let me = this;
                /* 获取当前事件数据行所有子节点的pid前缀 */
                let id = evt.target.getAttribute('now-id');
                let val = null;
                let removeRow = null;
                
                for(let k = 0;k < me.treeArray.length;k ++) {
                    if(me.treeArray[k].id+'' === id) {
                        removeRow = me.treeArray[k];
                        val = removeRow.pid + '&' + id;
                        break;
                    }
                }
                let obj = me.treeArray;
                let temp = [];
                obj.map(it => {
                    /* 遍历删除所有符合pid格式的节点和子节点 */
                    let txt = (it.pid+'&'+it.id).replace(val, '');
                    if(txt !== '' && txt.indexOf('&') !== 0) {
                        temp.push(it);
                    }
                });
                me.treeArray = temp;
                obj = me.newArray;
                temp = [];
                /* 遍历删除源数据中所有符合pid格式的节点和子节点 */
                for(let i = 0;i < obj.length;i ++) {
                    let it = obj[i];
                    let txt = (it.pid+'&'+it.id).replace(val, '');
                    if(txt !== '' && txt.indexOf('&') !== 0) {
                        temp.push(it);
                    }
                }
                me.newArray = temp;
                /* 触发选择事件，传递给调用方点击事件类型和当前点击数据对象 */
                this.emitEvent({type: "delete", obj: removeRow });
            },
            /* 编辑行事件 */
            editRowEvt(evt) {
                let me = this;
                if(me.hasEditNode()) {
                    return false;
                }
                /* 获取点击节点的行数据id */
                let id = evt.target.getAttribute('now-id');
                let obj = me.treeArray;
                let temp = [];
                /* 遍历设置编辑状态为true */
                obj.map(it => {
                    if(it.id+'' === id) it.edit = true;
                    temp.push(it);
                });
                me.treeArray = temp;
            },
            /* 保存行数据方法 */
            saveRowEvt(evt) {
                let me = this;
                /* 获取当前行数据id */
                let id = evt.target.getAttribute('now-id');
                let obj = me.treeArray;
                let temp = [];
                let val = null;
                let editRow = null;

                obj.map(it => {
                    if(it.id+'' === id) {
                        editRow = it;

                        it.edit = false;
                        val = it;
                        /* 遍历所有行节点进行数据重组 */
                        let node = me.$refs.tableBox.querySelector('div[row-id="'+id+'"]');
                        let nodes = node.querySelectorAll('span[node-type="txt"]');
                        for(let k = 0;k < nodes.length;k ++) {
                            let key = nodes[k].getAttribute('now-name');
                            let idx = nodes[k].getAttribute('now-idx');
                            /* 如果是图标，和弹出层类型的数据，需要取node-val里边的值，其它页面编辑的数据则直接取innerText */
                            let editVal = (it.d[idx].t === 'btn' || it.d[idx].t === 'icon') ?  nodes[k].getAttribute("node-val") : nodes[k].innerText;
                            it[key] = editVal;
                            it.d[idx].v = editVal;
                        }
                        
                    }
                    temp.push(it);
                });
                me.treeArray = temp;
                this.emitEvent({type: "save", obj: editRow});
            },

            /* 编辑时按钮单元格，按钮事件 */
            modalColEvt(evt) {
                let me = this;
                /* 获取到当前行数据的id和列名 */
                let id = evt.target.getAttribute('now-id');
                let name = evt.target.getAttribute('now-name');
                let modalRow = null;

                for(let i = 0;i < me.treeArray.length;i ++) {
                    if(me.treeArray[i].id+'' === id) {
                        modalRow = me.treeArray[i];
                        break;
                    }
                }
                /* 触发选择事件，传递给调用方点击事件类型和当前点击数据对象 */                
                this.emitEvent({type: "modal", obj: modalRow, col: name});
            },

            /* 展开和收起节点时拼接数据方法 */
            editCollapseRow(id, cb, type) {
                let me = this;
                let flag = false;
                for(let i = 0;i < me.treeArray.length;i ++) {
                    let it = me.treeArray[i];
                    if(id === it.id+'') {
                        /* 如果节点展开的话，需要关闭节点 */
                        if(it.checked && type === 'sibling') {
                            flag = true;
                            it.checked = false;
                            me.$set(me.treeArray, i, it);
                            me.formatArray((it.checked ? 'expand' : 'collapse'), it.pid + '&' + it.id, i+1, it.layer + 1, cb);
                        }
                        if(type === 'paternity') {
                            if(it.hasChild && !it.checked) {
                                flag = true;
                                it.checked = true;
                                me.$set(me.treeArray, i, it);
                                me.formatArray((it.checked ? 'expand' : 'collapse'), it.pid + '&' + it.id, i+1, it.layer + 1, cb);
                            }
                            if(!it.hasChild) {
                                it.hasChild = true;
                                it.checked = true;
                                me.$set(me.treeArray, i, it);
                            }
                        }
                        break;
                    }
                }
                if(!flag) cb && cb();
            },
            /* 插入新节点方法 */
            insertNewRow(id, type) {
                let me = this;
                let obj = me.treeArray;
                let copyObj = null;
                let idx = 0;
                /* 获取到需要插入兄弟节点数据的数据对象节点 */
                for(let i = 0;i < obj.length;i ++) {
                    if(obj[i].id+'' === id) {
                        copyObj = obj[i];
                        idx = i;
                        break;
                    }
                }
                /* 深度拷贝数据节点对象 */
                let insObj = {};
                /* 生成唯一ID */
                let insId = 'NEW' + Date.now();
                /* 遍历数据格式进行数据重组 */
                for(let name in copyObj) {
                    if(copyObj.hasOwnProperty(name) && name !== 'd') {
                        insObj[name] = copyObj[name];
                    }
                }
                /* 设置id 为唯一 没有子节点 处于编辑状态 */
                insObj.id = insId;
                insObj.hasChild = false;
                insObj.edit = true;
                insObj.d = [];
                /* 如果为父子节点的话需要设置layer的层级比当前节点深一层，pid为当前节点的pid+当前节点的id */
                if(type === "paternity") {
                    insObj.layer = insObj.layer*1 + 1;
                    insObj.pId = copyObj.id;
                    insObj.pid = copyObj.pid + '&' + copyObj.id;
                }
                /* 为新增行数据进行展示字段拼接 */
                let dObj = [];
                me.propObj.map(obj => {
                    dObj.push({
                        v: obj.v === 'id' ? insId : '', w: obj.w, f: obj.v, t: obj.t, d: obj.d
                    });
                });
                insObj.d = dObj;
                /* 在展示树数组对象指定位置插入一行空数据 */
                me.treeArray.splice(idx + 1, 0, insObj);
                /* 遍历元数据，找到对应的节点，插入相应数据对象 */
                for(let k = 0;k < me.newArray.length;k ++) {
                    if(me.newArray[k].id+'' === id) {
                        me.newArray.splice(k + 1, 0, insObj);
                        break;
                    }
                }
            },
            /* 插入兄弟节点事件 */
            stepRowEvt(evt) {
                let me = this;
                /* 如果存在编辑行，保存后再进行插入节点操作 */
                if(me.hasEditNode()) {
                    return false;
                }
                /* 获取当前节点的id，如果是文件夹并且是展开的情况需要收起文件夹，然后再添加兄弟节点 */
                let id = evt.target.getAttribute('now-id');
                me.editCollapseRow(id, () => {
                    me.insertNewRow(id);
                }, 'sibling');
            },

            stepCRowEvt(evt) {
                let me = this;
                /* 如果存在编辑行，保存后再进行插入节点操作 */
                if(me.hasEditNode()) {
                    return false;
                }
                /* 获取当前节点的id，如果是文件夹并且是展开的情况需要收起文件夹，然后再添加兄弟节点 */
                let id = evt.target.getAttribute('now-id');
                me.editCollapseRow(id, () => {
                    me.insertNewRow(id, 'paternity');
                }, 'paternity');
            },

            /**
             * 广播事件
             * @param {object} data - 广播的数据
             */
            emitEvent: function (data) {
                this.$emit("onSelectEvt", data);
            }
        }
    }
</script>
