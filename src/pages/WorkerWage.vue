<template>  
  <el-form label-position="right" label-width="auto" :model="queryWageForm" style="max-width: 600px">
    <el-form-item label="工资年份（可为空）">
      <el-input v-model="queryWageForm.year" style="width: 240px" placeholder="请输入要查询的年份（可为空）" />
    </el-form-item>
    <el-form-item label="工资月份（可为空）">
      <el-input v-model="queryWageForm.month" style="width: 240px" placeholder="请输入要查询的月份（可为空）" />
    </el-form-item>
    <el-button type="primary" @click="GetWorkerWage(1)">
      提交
    </el-button>
  </el-form>
  <el-table :data="wageList" style="width: 100%">
    <el-table-column fixed label="员工姓名" prop="name" />
    <el-table-column label="工资年份" prop="year" />
    <el-table-column label="工资月份" prop="month" />
    <el-table-column label="金额" prop="money" />
  </el-table>
  <div class="example-pagination-block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="prev, pager, next" :total="total" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue"
import { getWorkerWage } from "@/api/wage"
import { getWorkerList } from "@/api/worker"
import { useUserStore } from '@/stores/user'
import { ElNotification } from 'element-plus'
const workerList = ref();
const wageList = ref();

const currentPage = ref(1)
const total = ref(20)
const pageSize = ref(10)

onMounted(() => {
  GetWorkerWage(1);
});
const userStore = useUserStore()

const queryWageForm = reactive({
  id: '',
  year: '',
  month: ''
})



const GetWorkerWage = (num) => {
  getWorkerWage({
    "username": userStore.username,
    "year": queryWageForm.year,
    "month": queryWageForm.month,
    "current":  currentPage.value,
    "size":  pageSize.value
  })
    .then((res) => {
      wageList.value = res.data.records;
      currentPage.value = num;
      pageSize.value = res.data.size;
      total.value = res.data.total;
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`);
  currentPage.value = 1;
  pageSize.value = val;
}

const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`);
  currentPage.value = val;
  getWorkerList(val)
}


</script>

<style lang="less">
</style>