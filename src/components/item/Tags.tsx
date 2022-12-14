import { defineComponent, PropType, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { useTags } from '../../shared/useTags';
import s from './Tags.module.scss';
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    },
    selected: {
      type: Number,
    }
  },
  emits: ['update:selected'],//保持类型一致
  setup(props, context) {
    //请求数据
    const { tags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>(
        "/tags",
        {
          kind: props.kind,
          page: page + 1,
        },
        {
          _mock: "tagIndex",
          _autoLoading: true,
        }
      )
    })
    const onSelect = (tag: Tag) => {
      //触发一个事件，向父页传输数据
      context.emit('update:selected', tag.id)
    }

    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()
    const router = useRouter()

    const onLongPress = (tagId:Tag['id']) => {//长按之后跳转编辑
      router.push(`/tags/${tagId}/edit?kind=${props.kind}`)
    }

    const onTouchStart = (e: TouchEvent,tag:Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(() => {
        onLongPress(tag.id)
      }, 800)
    }
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value)
    }
    const onTouchMove = (e: TouchEvent) => {
      //获取点坐标下的元素
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (currentTag.value !== pointedElement && currentTag.value?.contains(pointedElement) === false) {//contains是否包含某个元素
        clearTimeout(timer.value)
      }
    }
    return () =>
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
          <RouterLink to={`/tags/create?kind=${props.kind}`}class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div class={[s.tag, props.selected === tag.id ? s.selected : '']}
              onClick={() => onSelect(tag)}
              onTouchstart={(e)=>onTouchStart(e,tag)}
              onTouchend={onTouchEnd}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={s.more}>
          {hasMore.value ?
            <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> :
            <span class={s.noMore}>没有更多</span>
          }
        </div>
      </>
  }
})