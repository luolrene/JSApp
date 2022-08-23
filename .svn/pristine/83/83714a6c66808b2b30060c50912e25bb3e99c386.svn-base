<template>
  <view>
    <u-mask :show="true" :custom-style="{background: 'rgba(0, 0, 0, 0)'}"></u-mask>
    <view class="loading-21">
    	<view></view>
    	<view></view>
    	<view></view>
    	<view></view>
    	<view></view>
    	<view></view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
  },
  created () {

  }
}
</script>

<style>
.loading-21 view {
  width: 40upx;
  height: 40upx;
  border-radius: 20upx;
  backface-visibility: hidden;
  position: absolute;
  animation-name: move;
  animation-timing-function: cubic-bezier(0.4, 0, 1, 0.8);
  animation-iteration-count: infinite;
  animation-duration: 3s;
  top: calc(50% - 100upx);
  left: 50%;
	z-index: 1;
  transform-origin: -20upx center;
}
.loading-21 view:nth-child(1) {
  background: blue;
  animation-delay: -0.5s;
  opacity: 0;
}
.loading-21 view:nth-child(2) {
  background: orange;
  animation-delay: -1s;
  opacity: 0;
}
.loading-21 view:nth-child(3) {
  background: #09BB07;
  animation-delay: -1.5s;
  opacity: 0;
}
.loading-21 view:nth-child(4) {
  background: blue;
  animation-delay: -2s;
  opacity: 0;
}
.loading-21 view:nth-child(5) {
  background: orange;
  animation-delay: -2.5s;
  opacity: 0;
}
.loading-21 view:nth-child(6) {
  background: #09BB07;
  animation-delay: -3s;
  opacity: 0;
}
@keyframes move {
  0% {
    transform: scale(1) rotate(0deg) translate3d(0, 0, 1px);
  }
  30% {
    opacity: 1;
  }
  100% {
    z-index: 10;
    transform: scale(0) rotate(360deg) translate3d(0, 0, 1px);
  }
}
</style>
