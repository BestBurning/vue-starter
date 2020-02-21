<template>
  <div class="user">
      <h1>Hello vue</h1> 
      <table id="users">
          <tr>
              <th>id</th>
              <th>姓名</th>
              <th>是否管理员</th>
              <th>版本</th>
          </tr>
          <tr v-for="item in records">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.admin}}</td>
              <td>{{item.version}}</td>
          </tr>
      </table>
  </div>

</template>

<script>

export default {
    name: "users",
    data(){
        return {
            records: 
            [],
            total: 12,
            size: 4,
            current: 1,
            orders: [],
            hitCount: false,
            searchCount: true,
            pages: 3
        }
    },
    created () {
        axios.get('http://localhost:8888/student?current=1&size=4').then(response => 
                this.records=response.data.records
            )
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
    }
}
</script>

<style>
  table, th, td
  {
    border-collapse:collapse;
    border: 1px solid rgb(3, 3, 3);
  }
  table
  {
  width:60%;
  }
</style>