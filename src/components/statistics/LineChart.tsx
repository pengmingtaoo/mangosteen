import * as echarts from 'echarts';
import { defineComponent, onMounted, PropType, ref } from 'vue'
import s from './LineChart.module.scss';
export const LineChart = defineComponent({
props:{
name:{
type: String as PropType<string>,
}
},
setup(props, context) {
  const refDiv = ref<HTMLDivElement>()
  onMounted(() => {
      if (!refDiv.value) { return }

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv.value);
      // 绘制图表
      const option = {
        grid: [
          {left:0,right:0,top:0,bottom:20}
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
      myChart.setOption(option);

    })
  return () => 
    <div ref={refDiv} class={s.echart}></div>
}
})