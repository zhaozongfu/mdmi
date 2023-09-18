<template>
  <div class="hello">
    <h1>作业一:</h1>
    <el-button type="primary" plain @click="butpost()">发送请求加密请求</el-button>
    <div>
      <h1>作业二:</h1>
      <input type="file" @change="handleFileUpload">
      <button @click="uploadImage">上传图片</button>
    </div>

    <div class="box2">
      <h1>作业三:</h1>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <div class="box">
            <img :src="base64Image" alt="" v-show="xian">
          </div>
        </el-form-item>
        <el-form-item label="userid">
          <el-input v-model="form.userid"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nexkname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date3" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5';
export default {
  data() {
    return {
      base64Image: '',
      xian: false,
      uploadedImage: null,
      form: {
        name: '',
        region: '',
        pass: "",
        date1: '',
        date2: '',
        date3: '',
        delivery: false,
        type: [],
        resource: '',
        email: '',
        desc: '',
        userid: '',
        image: '',
        nexkname: '',
      }
    };
  },
  mounted() {

  },
  methods: {
    butpost() {
      this.$apiPost(
        "https://www.zzgoodqc.cn/index.php/index/callcenter/getheaders",
        {
          name: "getheaders",
          role: "gets",
          sign: md5('getheaders' + 'gets' + 'nbsp123ok' + '333')
        },
        {
          headers: {
            'strheader': '333',
          },
        }).then(res => {

          console.log(res);
        })
        .catch(error => {
          // 处理 Promise 的拒绝情况
          console.error(error);
        });
    },
    handleFileUpload(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      // 设置读取完成后的回调函数
      reader.onload = (event) => {
        this.base64Image = event.target.result; // 将图片的 base64 数据保存到组件的 data 中
      };

      // 读取图片文件

      reader.readAsDataURL(file);
      this.uploadedImage = this.base64Image
      console.log(this.uploadedImage);

    },
    uploadImage() {
      // 在这里发送上传请求，例如使用 axios 库发送 POST 请求
      this.$apiPost('https://www.zzgoodqc.cn/index.php/index/upload/uploadimg', {
        'imgurl': this.base64Image
      }).then(response => {
        console.log('上传成功：', response);
        localStorage.setItem('uploadimg', JSON.stringify('https://www.zzgoodqc.cn/'+response.data.url));

      }).catch(error => {
        console.error('上传失败：', error);
      });
      this.xian = true
    },
    dateFun() {
      let date = new Date();
      let a1 = date.getFullYear();
      let b = date.getMonth() + 1;
      let c = date.getDate();
      let d = date.getHours().toString().padStart(2, "0");
      let e = date.getMinutes().toString().padStart(2, "0");
      let f = date.getSeconds().toString().padStart(2, "0");
      let tmp = `${a1}-${b}-${c}-${d}:${e}:${f}`;
      return tmp;
    },
    onSubmit() {
      let str = localStorage.getItem('uploadimg');
      let obj = {
        name: this.form.name,
        userid: this.form.userid,
        nick: this.form.nexkname,
        sex: this.form.resource,
        iphone: this.form.pass,
        emails: this.form.email,
        img: str
      }

      console.log(str);
      console.log(obj);
      console.log(2);
      this.$apiPost('index.php/index/index/mycenter', obj).then(res => {
        console.log(res);
        console.log(1);
      })

    }
  }
}
</script>
<style scoped>
.hello {
  position: relative;
}

.box {
  width: 50px;
  height: 50px;

}

img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.but {
  position: absolute;
  bottom: -120px;
  right: 0;
}

.box2 {
  position: absolute;
  bottom: -425px;
  right: 0px;
  width: 800px;
  float: right;
}
</style>
