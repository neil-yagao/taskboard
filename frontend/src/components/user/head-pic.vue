<template>
<el-upload
  class="avatar-uploader"
  :action="'dev/users/' + userId + '/head'"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :data="imageInfo"
  :disabled="disabled">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <img v-else-if="headImage" :src="'/dev/static/' + headImage" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>

<script>
/**
 * TODO need to switch the url in this file
 */
  export default {
    data() {
      return {
        imageUrl: '',
        imageInfo:{
          name:''
        }
      };
    },
    props:{
      userId:{
        type:String,
        required:true
      },
      headImage:{
        type:String,
        default:''
      },
      disabled:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log('res',res);
        console.log('file',file);
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageInfo.name = '';
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        this.imageInfo.name = file.name;
        if (!isLt2M) {
          this.$messageBox.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>
