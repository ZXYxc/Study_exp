<template>
    <div class="nbs-comments">
        <table class="head">
            <td class="profile">
                <img v-if="user_profile_type" :src="'/pages/profiles/' + user_id + '.' + user_profile_type" style="width:50px;height:50px;border-radius:50%;">
                <img v-else src="/pages/profiles/空头像.png" style="width:50px;height:50px;border-radius:50%">
            </td>
            <td class="author">
                <div class="up">
                    <span class="name">
                        {{ user_name }}
                    </span>
                    <span class="type">
                        {{ user_type }}
                    </span>
                </div>
                <div class="time">
                    {{ comment_time }}
                </div>
            </td>
        </table>
        <div class="content">
            {{ comment_content }}
        </div>
        <div class="like blank">
            <i></i>
            <span :id="'like_' + comment_id "> 👍👍🏻👍🏼👍🏽👍🏾👍🏿{{ like_count }}</span>
        </div>
        <div class="reply">
            <comment-bar v-for="reply in replies" :key="reply">
                {{ reply }}
            </comment-bar>
        </div>
        <comment-bar v-for="reply in replies" :key="reply" :replies="reply"></comment-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        user_profile_type: {
            type: String,
            required: true
        },
        user_id: {
            type: Number,
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        user_type: {
            type: String,
            required: true
        },
        comment_time: {
            type: String,
            required: true
        },
        comment_content: {
            type: String,
            required: true
        },
        comment_id: {
            type: Number,
            required: true
        },
        like_count: {
            type: Number,
            required: true
        },
        replies: {
            type: Array,
            required: false
        }
    }
}
</script>

<style scoped>
    /* .nbs-comments {
        box-sizing: content-box;
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;

    } */
    .profile {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        vertical-align: middle;
        box-sizing: content-box;
    }
    .name {
        color: #6b757a;
        vertical-align: middle;
        outline: none;
        text-decoration: none;
        box-sizing: content-box;
        font-weight: 700;
        line-height: 18px;
        position: relative;
    }
    .type {
        color: orange;
        font-size: 10px;
    }
    .time {
        color: #99a2aa;
        line-height: 26px;
    }
    .like {
        color: #99a2aa;
        line-height: 13px;
        font-size: 12px;
    }
    .like .bla2nk {
        background-position: 800px 30px;
    }
    .reply {
        margin-left: 30px;
    }
</style>