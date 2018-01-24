/*********************************************************************
 * Created by zhangtao on 2017/12/27                                 *
 *********************************************************************/

<template>
    <div class="uploader">
        <ls-button :name="uploadLabel" @clickEvt="handleClickBtn"></ls-button>
        <input v-if="createInput" ref="input" type="file" :accept="accept" :multiple="multiple" @change="handleSelectFile" />        
    </div>
</template>

<script>
    import Vue from "vue";

    import SingleUploadItem from "./SingleUploadItem";
    import SliceUploadItem from "./SliceUploadItem";

    let defaultId = 0;

    export default {
        props: {
            uploadLabel: {
                type: String,
                default: "上传文件"
            },

            uploadUrl: {
                type: String,
                required: true
            },

            fileKey: {
                type: String,
                default: "file"
            },

            accept: {
                type: String,
                default: "*/*"
            },

            multiple: {
                type: Boolean,
                default: false
            },

            isSlice: {
                type: Boolean,
                default: false
            },

            sliceSize: {
                type: Number,
                default: 200 // 单位为 Kb
            },

            isAutoUpload: {
                type: Boolean,
                default: true
            },

            isUploadSuccess: {
                type: Function
            }
        },

        data: function () {
            return {
                uploaders: [],
                createInput: true,
                eventHub: null
            };
        },

        created() {
            this.eventHub = new Vue();
            this.bindEventListener();
        },

        methods: {
            handleClickBtn() {
                this.$refs.input.click();
            },

            handleSelectFile() {
                let files = this.$refs.input.files;
                    
                for(let i = 0, j = files.length; i < j; ++i) {
                    this.uploaders.push(this.buildUploadItem(files[i]));
                }
                
                if (this.isAutoUpload) {
                    this.startUploader();
                } 
            },

            buildUploadItem(file) {
                if (this.isSlice) {
                    return new SliceUploadItem(this.getDefaultId(), file, {
                        uploadUrl: this.uploadUrl, 
                        isSlice: this.isSlice,
                        sliceSize: this.sliceSize,
                        eventHub: this.eventHub,
                        fileKey: this.fileKey,
                        isUploadSuccess: this.isUploadSuccess
                    });
                } else {
                    return new SingleUploadItem(this.getDefaultId(), file, {
                        uploadUrl: this.uploadUrl,
                        eventHub: this.eventHub,
                        fileKey: this.fileKey,
                        isUploadSuccess: this.isUploadSuccess
                    });
                }
            },

            startUploader() {
                this.uploaders.forEach((uploader) => {
                    if (uploader.isPendingUpload()) {
                        uploader.startUpload();
                    }
                });
                this.createInput = false;
                this.$nextTick(() => this.createInput = true);
            },

            bindEventListener() {
                this.eventHub.$on("upload", this.handleUploadEvent.bind(this));
            },

            /**
             * 判断是否存在有活动的上传
             */
            haveActiveUpload() {
                return this.uploaders.some((item) => item.isActive());
            },

            /**
             * 清除正在上传
             */
            clearUpload() {
                this.eventHub.$emit("cancelUpload");
                this.uploaders = [];
            },

            /**
             * 显示上传输入框
             */
            showFileSelector() {
                this.$refs.input.click();
            },

            handleUploadEvent(event) {
                switch(event.type) {
                    case "start":
                        this.handleUploadStart(event);
                        break;
                    case "progress":
                        this.handleUploadProgress(event);
                        break;
                    case "finish":
                        this.handleFinishUpload(event);
                        break;
                    case "stop":
                        this.handleStopUpload(event);
                        break;
                    case "error":
                        this.handleUploadError(event);
                        break;
                    default:
                        break;
                }
            },

            handleUploadStart(msg) {
                this.$emit("upload", msg);
            },

            handleUploadProgress(msg) {
                this.$emit("upload", msg);
            },

            handleFinishUpload(event) {
                this.$emit("upload", event);
            },

            handleStopUpload(event) {
                this.$emit("upload", event);                
            },

            handleUploadError(event) {
                this.$emit("upload", event);
            },

            getDefaultId() {
                return "_frontUpload_" + defaultId++;
            },

            cancelUpload(id) {
                this.eventHub.$emit("cancelUpload", id);
            },

            toggleUpload(id) {
                this.eventHub.$emit("toggleUpload", id);
            }
        }
    };
</script>
