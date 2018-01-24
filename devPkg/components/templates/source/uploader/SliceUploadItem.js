import UploadItem from "./UploaderItem";

class SliceUploadItem extends UploadItem {
    startUpload() {
        this.request = this.createHttpRequest();
        this.startTime = (new Date()).getTime();
        this.previousLoad = 0;
        this.isStopUpload = false;
        this.sliceSize = this.covertbitToKb(this.options.sliceSize);
        this.sliceIndex = 1;
        this.sliceUpLoadSize = 0;
        this.alreadyUploadSize = 0;
        this.sliceUpload();
    }

    bindEventListener() {
        this.options.eventHub.$on("cancelUpload", this.cancelUpload.bind(this));
        this.options.eventHub.$on("toggleUpload", this.toggleUpload.bind(this));
    }

    sliceUpload() {
        let start = (this.sliceIndex - 1) * this.sliceSize,
            end = this.sliceIndex * this.sliceSize,
            sendData = null;

        // 当暂停上传时直接返回
        if (this.isStopUpload) {
            return;
        }

        // 当开始上传第一个分片时，通知外部已经开始上传了
        if (this.sliceIndex === 1) {
            this.uploadStart({loaded: 0, total: this.file.size});
        }
        // 当分片的起点已经大于文件的大小时，表明上传结束，通知外部结束上传                    
        if (start > this.file.size) {
            this.uploadFinish();
            return;
        }

        if (end >= this.file.size) {
            // 当分片的终点大于文件的大小时，直接截取到最后
            sendData = this.file.slice(start);            
            this.uploadSliceData({data: sendData, index: this.sliceIndex, fileName: this.file.name, finish: true});
            this.sliceIndex++;                       
        } else {
            // 分片上传
            // @TODO 可以在 end 只于小文件一定大小时，把在最后一片把所有数据全发出去
            sendData = this.file.slice(start, end);
            this.uploadSliceData({data: sendData, index: this.sliceIndex, fileName: this.file.name, finish: false});
            this.sliceIndex++;            
        }        
    }

    uploadSliceData(data) {
        let sendData = new FormData();

        this.request = this.createHttpRequest();

        sendData.append("sliceIndex", data.index);
        sendData.append(this.options.fileKey, data.data);
        sendData.append("finish", data.finish);
        sendData.append("fileName", data.fileName);

        this.request.send(sendData);
    }

    /**
     * 判断是否处于活动状态
     * 如果处于 finish 或者 cancel 时，则非活动状态
     * 如果处于 pending 或者 upload 或者 stop 则是非活动状态
     */
    isActive() {
        if (this.isPendingUpload() || this.isUploading() || this.isPauseUpload()) {
            return true;
        }
        return false;
    }

    /**
     * 判断当前处于暂停状态
     */
    isPauseUpload() {
        return this.status === "stop";
    }

    /**
     * 暂停上传
     */
    toggleUpload() {
        this.isStopUpload = !this.isStopUpload;
        if (!this.isStopUpload) {
            this.status = "upload"
            this.sliceUpload();
        } else {
            this.status = "stop";
            this.uploadStop();
        }
    }

    /**
     * 通知外部上传被暂停
     */
    uploadStop() {
        this.request.abort();
        this.sliceIndex--;
        this.emitEvent("stop");
    }

    /**
     * 分片上传正在进行
     */
    sliceUploadProgress(event) {
        this.uploadProgress({loaded: this.alreadyUploadSize + event.loaded, total: this.file.size});
    }
    
    /**
     * 分片上传结束的时候上传下一个分片
     */
    sliceUploadFinish(event) {
        this.alreadyUploadSize += event.total;
        this.sliceUpload();
    }

    /**
     * 创建 http 请求
     */
    createHttpRequest() {
        let request = new XMLHttpRequest();

        request.open("POST", this.options.uploadUrl);        

        request.upload.onprogress = this.sliceUploadProgress.bind(this);
        request.upload.onload = this.sliceUploadFinish.bind(this);
        
        return request;
    }
}

export default SliceUploadItem;