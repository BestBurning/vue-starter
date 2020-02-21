<template>
   <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="学生姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="是否为管理员" prop="delivery">
    <el-switch v-model="ruleForm.admin"></el-switch>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>

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
      success(message) {
        this.$message({
          showClose: true,
          message: message,
          type: 'success'
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8888/student',this.ruleForm).then(resp => {
                if(resp.data == true){
                  this.success('创建成功');
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>