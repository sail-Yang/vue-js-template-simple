<template>  
  <el-form label-position="right" label-width="auto" :model="addWageForm" style="max-width: 600px">
    <el-form-item label="选择员工">
      <el-select  v-model="addWageForm.id" placeholder="选择员工" style="width: 400px">
        <el-option
          v-for="item in workerList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
          >
            编号：{{ item.id }}
          </span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="工资时间">
      <el-date-picker
        v-model="addWageForm.date"
        type="month"
      />
    </el-form-item>
    <el-form-item label="工资数额">
      <el-input-number v-model="addWageForm.money" :precision="2" :step="0.1" :max="100000000" :min="0"/>
    </el-form-item>
    <el-button type="primary" @click="AddWage()">
      提交
    </el-button>
  </el-form>
  
</template>

<script setup>
import { ref, onMounted, reactive } from "vue"
import { getWorkerList } from "@/api/worker"
import { addWage } from "@/api/wage"
import { ElNotification } from 'element-plus'
const workerList = ref();

onMounted(() => {
  getWorkInfo();
});


const getWorkInfo = () => {
  getWorkerList()
    .then((res) => {
      workerList.value = res.data;
    })
    .catch((err) => {
      console.log(err)
    })
}

const addWageForm = reactive({
  id: '',
  date: '',
  money: 0,
  year: 2024,
  month: 1
})

const AddWage = () => {
  console.log(addWageForm)
  addWageForm.year = addWageForm.date.getFullYear();
  addWageForm.month = addWageForm.date.getMonth() + 1;
  addWage({
    "id": addWageForm.id,
    "year": addWageForm.year,
    "month": addWageForm.month,
    "money": addWageForm.money
  })
  .then(() => {
    ElNotification.success({
      title: '添加成功',
      message: '添加工资成功',
    })
  })
  .catch((err) => {
    console.log(err)
  })
}

</script>

<style lang="less">
</style>