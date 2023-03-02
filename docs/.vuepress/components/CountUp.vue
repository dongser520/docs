<template>
    <div>
        <ClientOnly>
            <slot name="before" />
            <span ref="countUp"></span>
            <span>我是countup组件</span>
        </ClientOnly>
    </div>
</template>

<script>
export default {
    name: 'CountUp',
    props: {
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        //分割符号
        decimalPlaces: {
            type: Number,
            default: 0
        },
        //动画持续时间秒
        duration: {
            type: Number,
            default: 2
        },
        delay:{
            type: Number,
            default: 0
        }
    },
    mounted() {
       this.init();
    },
    data() {
        return {
            counter: null
        }
    },
    methods: {
        init() {
            import('countup.js').then(module => {
                this.$nextTick(() => {
                    //使用示例：https://inorganik.github.io/countUp.js/
                    //文档：https://github.com/inorganik/countUp.js#readme
                    this.counter = new module.CountUp(this.$refs.countUp, this.endVal, {
                        startVal: this.startVal,
                        decimalPlaces: this.decimalPlaces,
                        duration: this.duration
                    });

                    setTimeout(() => {
                        this.counter.start();
                    }, this.delay);
                })
            });
        }
    },
    beforeDestroy(){
        this.counter.reset();
        this.counter = null;
    }
}
</script>