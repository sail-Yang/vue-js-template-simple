<template>
  <el-form label-position="right" label-width="auto" :model="pwdForm" style="max-width: 600px">
    <el-form-item label="请输入新密码">
      <el-input v-model="pwdForm.pwd" style="width: 240px" placeholder="请输入新密码" />
    </el-form-item>
    <el-button type="primary" @click="UpdatePwd()">
      提交
    </el-button>
  </el-form>
</template>

<script setup>
  import {ref ,reactive } from "vue"
  import { useUserStore } from '@/stores/user'
  import { updatePwd } from '@/api/user'
  import { ElNotification } from 'element-plus'
  const userStore = useUserStore()

  const pwdForm = reactive({
    pwd: ''
  })

  const UpdatePwd = () => {
  updatePwd({
    username: userStore.username,
    pwd: pwdForm.pwd
  })
  .then(() => {
    ElNotification.success({
      title: '修改成功',
      message: '修改密码成功',
    })
  })
  .catch((err) => {
    console.log(err)
  })
}
</script>

<style lang="less">
</style>