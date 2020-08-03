<template>
    <div class="lab-panel">
        <el-link :href="href" target="blank">
            <div class="top">
                <el-image :src="src" style="height:100%;width:100%"></el-image>
            </div>
            <div class="bottom">
                <h3 class="name">{{ lab_name }}</h3>
                <p class="desc">{{ lab_desc }}</p>
            </div>
        </el-link>
        <el-button type="text" v-if="show_delete" @click="dialogue" class="delete hidden">删除</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        src: {
            type: String
        },
        href: {
            type: String
        },
        lab_id: {
            type: Number
        },
        lab_name: {
            type: String
        },
        lab_desc: {
            type: String
        },
        show_delete: {
            type: Boolean
        },
        delete_fun: {
            type: Function
        }
    },
    methods: {
        dialogue() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$notify({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$notify({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style scoped>
.lab-panel{
    border-radius: 5px;
    width: 280px;
    height: 190px;
    background-color: #f9fbff;
    margin-bottom: 30px;
    float: left;
    margin-left: 20px;
    border: 1px solid lightgray;
    overflow: hidden;
    position: relative;
}

.lab-panel:hover {
    transition: all 0.3s;
    box-shadow: 2px 2px 8px 6px rgba(0, 0, 0, .1);
}

.top {
    width: 280px;
    height: 160px;
    display: block;
}

.bottom {
    transition: all 0.3s;
    margin: 0px 0px 0px 0px;
    display: block;
    margin: 0px;
}

.lab-panel:hover a {
    color: white;
    transition: 0.1s;
}

.lab-panel:hover .bottom {
    transition: all 0.3s;
    margin: -160px 0px 0px 0px;
}

.name {
    overflow: hidden;
    background-color: rgba(0, 0, 0, .3);
    border: none;
    opacity: 0.9;
    height: 30px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0px;
    word-break: break-word;
    font-size: 16px;
    text-decoration: none;
}

.desc {
    height: 160px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, .3);
    opacity: 0.9;
    margin: 0px;
    word-break: break-word;
    font-size: 14px;
    padding: 0 12px;
}

.delete {
    font-size: 14px;
    text-decoration: underline;
    position: absolute;
    right: 10px;
    bottom: 0px;
    cursor: pointer;
    color: blue;
    display: none;
}

.lab-panel:hover .delete {
    display: block;
}

.delete:hover {
    color: #ccc;
}

.el-link.el-link--default {
    color: black;
}
</style>