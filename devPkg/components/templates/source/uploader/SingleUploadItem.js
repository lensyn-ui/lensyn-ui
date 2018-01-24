import UploadItem from "./UploaderItem";

class SingleUploadItem extends UploadItem {
    bindEventListener() {
        this.options.eventHub.$on("cancelUpload", this.cancelUpload.bind(this));
    }

    startUpload() {
        this.request = this.createHttpRequest();
        this.startTime = (new Date()).getTime();
        this.previousLoad = 0;
        this.sendData(this.file);
    }

    /**
     * 判断是否处于活动状态
     * 如果处于 finish 或者 cancel 时，则非活动状态
     * 如果处于 pending 或者 upload 则是非活动状态
     */
    isActive() {
        if (this.isPendingUpload() || this.isUploading()) {
            return true;
        }
        return false;
    }

    /**
     * 向服务器提交数据
     * @param {object} fileData 
     */
    sendData(fileData) {
        let sendData = new FormData();

        sendData.append(this.options.fileKey, fileData);
        
        this.request.send(sendData);
    }

    /**
     * 创建 http 请求
     */
    createHttpRequest() {
        let request = new XMLHttpRequest();

        request.open("POST", this.options.uploadUrl);        

        request.upload.onloadstart = this.uploadStart.bind(this);
        request.upload.onprogress = this.uploadProgress.bind(this);
        //request.upload.onload = this.uploadFinish.bind(this);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                this.uploadFinish(request.responseText);
            }
        };
        
        return request;
    }
}

export default SingleUploadItem;