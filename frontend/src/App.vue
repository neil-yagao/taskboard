<template>
<div id="app" class="full-screen grey-background">
	<router-view/>
</div>
</template>

<script>
export default {
	name: 'App'
}
</script>
<style lang="scss">
$--color-primary: #22d1e0;

/* 改变 icon 字体路径变量，必需 */

$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
</style>
