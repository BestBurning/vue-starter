<template>
  <div>
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="学生姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="是否为管理员" prop="delivery">
        <el-switch v-model="ruleForm.admin"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>


<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          version: 0,
          admin: false
        },
        rules: {
          name: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put('http://localhost:8888/student',this.ruleForm).then(resp => {
                if(resp.data == true){
                  this.success();
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      success() {
        this.$message({
          showClose: true,
          message: '更新成功',
          type: 'success'
        });
      }
    },
    created(){
      axios.get('http://localhost:8888/student/'+this.$route.query.id).then(resp => {
        this.ruleForm = resp.data
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      });
    }
  }
</script>