import { defineComponent, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const refkind = ref("支出");
    return () => (
      <MainLayout>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="return" class={s.return} />,
          default: () => (
            <>
              {/* <Tabs
                selected={refkind.value}
                onUpdateSelected={(name) => (refkind.value = name)}
              > */}
              <Tabs v-model:selected={refkind.value}>
                <Tab name="支出">icon列表1</Tab>
                <Tab name="收入">icon列表2</Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});