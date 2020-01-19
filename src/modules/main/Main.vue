<template>
  <div class="example">
    {{ msg }}
    <el-button @click="handleClick">button</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "A Vue Project"
    };
  },
  methods: {
    handleClick() {
      console.log("handleClick");
    }
  }
};
</script>

<style lang="less" scoped>
.example {
  color: blue;
}
</style>