<template>
    <div>
        <p @click="hello">{{ test }}{{ test2 }}</p>
        <div v-for="item in list" :key="item">{{ item }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a: '点击触发事件',
            list: [1, 2, 3]
        }
    },
    props: {
        test: {
            type: String
        }
    },
    methods: {
        hello() {
            alert('111')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>