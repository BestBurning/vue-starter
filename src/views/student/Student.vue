<template>
<div>
  <el-table
    :data="records"
    stripe
    style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="admin" label="是否是管理员" :formatter="formatBoolean"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :page-size=size
  :total=total
  @current-change=page>
</el-pagination>
</div>
</template>

<script>
  export default {
    data() {
      return {
        records: [
        {
        id: 1,
        name: "张一",
        version: 0,
        admin: false
        },
        {
        id: 2,
        name: "张二",
        version: 0,
        admin: false
        }
        ],
        total: 11,
        size: 0,
        current: 1,
        orders: [ ],
        hitCount: false,
        searchCount: true,
        pages: 0
      }
    },
    methods:{
      handleEdit(index, row) {
        this.$router.push({
          path: '/studentUpdate',
          query:{
            id: row.id
          }
        })
      },
      handleDelete(index, row) {
        axios.delete('http://localhost:8888/student/'+row.id).then(resp => {
          if(resp.data == true){
            alert('删除成功');
          }
        }).catch(function(error){
          console.log(error);
        });
      },
      formatBoolean(data){
        var ret = ''  //你想在页面展示的值
        if (data.admin) {
            ret = "是"  //根据自己的需求设定
        } else {
            ret = "否"
        }
        return ret;
      },
      page(current){
        axios.get('http://localhost:8888/student?current='+current+'&size=5').then( resp => {
        this.records = resp.data.records
        this.pages = resp.data.pages
        this.size = resp.data.size
      }       
      ).catch(function (error) { // 请求失败处理
        console.log(error);
      });
      }
    },   
    created(){
        axios.get('http://localhost:8888/student?current=1&size=5').then( resp => {
            this.records = resp.data.records
            this.pages = resp.data.pages
            this.size = resp.data.size
        }       
        ).catch(function (error) { // 请求失败处理
        console.log(error);
      });
    }
  }
</script>