<template>
<div>
    <el-card style="width: 350px">
        <div slot="header" style="text-align:center">
            手机登录
        </div>
        <div>
            <el-form label-width="0px" :model="form" :rules="rules" ref="form">
                <el-form-item prop="phone">
                    <el-input v-model="form.phone" maxlength="11" minlength="11" clearable prefix-icon="el-icon-mobile-phone"></el-input>
                </el-form-item>
                <el-form-item prop="check">
                    <el-input v-model="form.check">
                        <el-button slot="append" @click="sendCode" :disabled="codeTime!=0">{{ codeButton }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%" type="primary">登录</el-button>
                </el-form-item>
                <el-form-item size="mini">
                    <el-checkbox style="float:right">我同意《<el-link>服务条款</el-link>》和《<el-link>隐私政策</el-link>》</el-checkbox>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            form: {
                phone: '',
                check: '',
            },
            rules: {
                phone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                check: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            codeTime: 0,
            codeButton: '获取验证码'
        }
    },
    methods: {
        sendCode() {
            this.codeTime = 30
            this.codeButton = this.codeTime + " 秒后重发"
            var q = setInterval(() => {
                if (--this.codeTime === 0) {
                    clearInterval(q)
                    this.codeButton="获取验证码"
                }
                else {
                    this.codeButton=this.codeTime + " 秒后重发"
                }
            }, 1000)
        }
    }
}
</script>