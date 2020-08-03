<template>
    <div class="lab-panel">
        <a :href="href" target="blank">
            <div class="top">
                <img :src="src">
            </div>
            <div class="bottom">
                <h3 class="name">{{ lab_name }}</h3>
                <p class="desc">{{ lab_desc }}</p>
            </div>
            <div v-if="delete_fun" @click="delete_fun" class="delete hidden">删除</div>
        </a>
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
        lab_name: {
            type: String
        },
        lab_desc: {
            type: String
        },
        delete_fun: {
            type: Function
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
    /*border: 1px solid lightgray;*/
    overflow: hidden;
}

.lab-panel:hover {
    transition: all 0.3s;
    box-shadow: 2px 2px 8px 6px rgba(50, 50, 50, .1);
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

.lab-panel:hover .bottom {
    transition: all 0.3s;
    margin: -160px 0px 0px 0px;
}

.name {
    overflow: hidden;
    background-color: white;
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
    background-color: white;
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
    bottom: 10px;
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
</style>