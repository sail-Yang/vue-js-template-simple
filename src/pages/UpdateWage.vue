<template>  
  <el-form label-position="right" label-width="auto" :model="updateWageForm" style="max-width: 600px">
    <el-form-item label="选择员工">
      <el-select  v-model="updateWageForm.id" placeholder="选择员工" style="width: 400px">
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
    <el-form-item label="修改工资时间">
      <el-date-picker
        v-model="updateWageForm.date"
        type="month"
        @change="getMoney"
      />
    </el-form-item>
    <el-form-item label="修改工资数额">
      <el-input-number v-model="updateWageForm.money" :precision="2" :step="0.1" :max="100000000" :min="0"/>
    </el-form-item>
    <el-button type="primary" @click="UpdateWage()">
      提交
    </el-button>
  </el-form>
  
</template>

<script setup>
import { ref, onMounted, reactive } from "vue"
import { getWorkerList } from "@/api/worker"
import { updateWage, getMoneyByDate } from "@/api/wage"
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

const updateWageForm = reactive({
  id: '',
  date: '',
  money: 0,
  year: 2024,
  month: 1
})

const getMoney = () => {
  updateWageForm.year = updateWageForm.date.getFullYear();
  updateWageForm.month = updateWageForm.date.getMonth() + 1;
  getMoneyByDate({
    "id": updateWageForm.id,
    "year": updateWageForm.year,
    "month": updateWageForm.month
  })
  .then((res) => {
    updateWageForm.money = res.data;
  })
  .catch((err) => {
    console.log(err)
  })
}

const UpdateWage = () => {
  updateWageForm.year = updateWageForm.date.getFullYear();
  updateWageForm.month = updateWageForm.date.getMonth() + 1;
  updateWage({
    "id": updateWageForm.id,
    "year": updateWageForm.year,
    "month": updateWageForm.month,
    "money": updateWageForm.money
  })
  .then(() => {
    ElNotification.success({
      title: '修改成功',
      message: '修改工资成功',
    })
  })
  .catch((err) => {
    console.log(err)
  })
}

</script>

<style lang="less">
</style>