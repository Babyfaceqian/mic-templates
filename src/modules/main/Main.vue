<template>
  <div class="example">
    {{ msg }}
    <el-button>button</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "A Vue Project"
    };
  }
};
</script>

<style scoped>
.example {
  color: blue;
}
</style>