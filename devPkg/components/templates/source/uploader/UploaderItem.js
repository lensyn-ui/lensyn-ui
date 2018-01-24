/*********************************************************************
 * Created by zhangtao on 2017/12/27                                 *
 *********************************************************************/

class UploaderItem {
    constructor(id, file, options) {
        this.status = "pending";
        this.id = id;
        this.options = options;
        this.file = file;
        this.formatFileSize = this.calculateFileSize();
        this.bindEventListener();
    }

    startUpload() {
        throw new Error("upload must implements startUpload");
    }

    /**
     * 取消上传
     * @param {string} id 
     */
    cancelUpload(id) {
        if (typeof id === "undefined" || this.id === id) {
            this.status = "cancel";
            this.request.onreadystatechange  = null;
            this.request.abort();
        }
    }

    /**
     * 判断是否上传已经结束
     */
    isFinishUpload() {
        return this.status === "finish";
    }

    /**
     * 判断是否已经取消上传
     */
    isCancelUpload() {
        return this.status === "cancel";
    }

    /**
     * 判断是否正处理于等待状态
     */
    isPendingUpload() {
        return this.status === "pending";
    }

    /**
     * 判断是否处于正在上传
     */
    isUploading() {
        return this.status === "upload";
    }

    /**
     * 当上传开始时，通知外面上传开始了
     * @param {object} event 
     */
    uploadStart(event) {
        this.status = "start";
        this.emitEvent("start", {percent: 0, speed: "0KB/s", loaded: event.loaded, total: event.total});
    }

    /**
     * 当正在上传时，通知外面上传的进度
     * @param {object} event 
     */
    uploadProgress(event) {
        let percent = ((event.loaded / event.total) * 100).toFixed(2),
            speed = this.calculateSpeed(event);
        this.status = "upload";
        this.emitEvent("progress", {percent, speed, load: event.load, total: event.total});
    }

    /**
     * 当上传结束时通知外部
     */
    uploadFinish(response) {
        this.status = "finish";
        if (this.options.isUploadSuccess) {
            if (this.options.isUploadSuccess(response)) {
                this.emitEvent("finish");
            } else {
                this.emitEvent("error");
            }

        } else {
            this.emitEvent("finish");
        }
    }

    /**
     * 计算上传的速度
     * 根据上一次上传的数据量和花费的时间间隔进行计算
     * @param {object} event 
     */
    calculateSpeed(event) {
        let currentTime = (new Date()).getTime(),
            spendTime = (currentTime - this.startTime) / 1000,
            sendSize = (event.loaded - this.previousLoad) / 1024,
            speed = (sendSize / spendTime),
            result = null;
        
        this.previousLoad = event.loaded;
        this.startTime = currentTime;

        if (speed > 1024) {
            result = (speed / 1024).toFixed(2) + "MB/s";
        } else {
            result = speed.toFixed(2) + "KB/s";
        }

        return result;
    }

    /**
     * 计算文件的大小
     */
    calculateFileSize() {
        let size = this.file.size / 1024;

        if (size > 1024) {
            return (size / 1024).toFixed(2) + "MB";
        }
        return size.toFixed(2) + "Kb";
    }

    /**
     * 向外部广播事件
     * @param {string} type 
     * @param {object} data 
     */
    emitEvent(type, data) {
        let msg = {id: this.id, file: this.file.name, type: this.getFileType(), formatSize: this.formatFileSize};

        if (data) {
            msg = {...msg, ...data};
        }
        this.options.eventHub.$emit("upload", {type, msg});
    }

    getFileType() {
        let type = this.file.type.split("/")[1];
        if (!type) {
            type = this.file.name.split(".")[1];
        }
        return type;
    }

    covertbitToKb(size) {
        return size * 1024;
    }
}

export default UploaderItem;