<template>  
  <el-table :data="workerList" style="width: 100%">
    <el-table-column fixed label="员工编号" prop="id" />
    <el-table-column label="员工姓名" prop="name" />
    <el-table-column label="员工登录用户名" prop="username" />
    <el-table-column label="员工密码" prop="password" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="medium" @click="EditWorkerID(row)">
          编辑
        </el-button>
        <el-button link type="primary" size="medium" @click="DelWorker(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="example-pagination-block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="prev, pager, next" :total="total" />
  </div>
  <el-button type="primary" style="margin-top: 3px;" @click="addDialogVisible = true;">
    添加员工
  </el-button>
  <el-dialog v-model="addDialogVisible" title="添加员工" width="500" align-center>
    <el-form label-position="right" label-width="auto" :model="addWorkerForm" style="max-width: 600px">
      <el-form-item label="员工姓名">
        <el-input v-model="addWorkerForm.name" />
      </el-form-item>
      <el-form-item label="登录用户名">
        <el-input  v-model="addWorkerForm.username" />
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="addWorkerForm.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogVisible = false; AddWorker()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="updateDialogVisible" title="修改员工信息" width="500" align-center>
    <el-form label-position="right" label-width="auto" :model="updateWorkerForm" style="max-width: 600px">
      <el-form-item label="员工姓名">
        <el-input v-model="updateWorkerForm.name" />
      </el-form-item>
      <el-form-item label="登录用户名">
        <el-input  v-model="updateWorkerForm.username" />
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="updateWorkerForm.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateDialogVisible = false; UpdateWorker()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue"
import { getWorkerPageList, addWorker, updateWorker, delWorker } from "@/api/worker"
import { ElNotification } from 'element-plus'
const workerList = ref();
const currentPage = ref(1)
const total = ref(20)
const pageSize = ref(10)
const addDialogVisible = ref(false)
const updateDialogVisible = ref(false)

onMounted(() => {
  getWorkerList(1)
});

const addWorkerForm = reactive({
  name: '',
  username: '',
  password: '',
})

const updateWorkerForm = reactive({
  name: '',
  username: '',
  password: '',
  id: -1
})

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

const getWorkerList = (num) => {
  getWorkerPageList({
    "current":  currentPage.value,
    "size":  pageSize.value
  })
    .then((res) => {
      workerList.value = res.data.records;
      currentPage.value = num;
      pageSize.value = res.data.size;
      total.value = res.data.total;
      console.log(workerList.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

const AddWorker = () => {
  addWorker(addWorkerForm)
    .then(() => {
      ElNotification.success({
        title: '添加成功',
        message: '添加员工成功',
      })
      getWorkerList(1)
    })
    .catch((err) => {
      console.log(err)
    })
}
const EditWorkerID = (row) => {
  let id = Number.parseInt(row.id)
  updateWorkerForm.name = row.name;
  updateWorkerForm.username = row.username;
  updateWorkerForm.password = row.password;
  updateWorkerForm.id = id;
  updateDialogVisible.value = true;
}

const UpdateWorker = () => {
  updateWorker(updateWorkerForm)
    .then(() => {
      ElNotification.success({
        title: '修改成功',
        message: '修改员工信息成功',
      })
      getWorkerList(1)
    })
}

const DelWorker = (row) => {
  let id = Number.parseInt(row.id)
  delWorker({"id": id})
    .then(() => {
      ElNotification.success({
        title: '删除成功',
        message: '删除员工成功',
      })
      getWorkerList(1)
    })
}
</script>

<style lang="less">
</style>