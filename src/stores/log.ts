/**
 * 系统错误收集
 * */
import { defineStore } from 'pinia';
const maxLen = 20; //最多多少条
export enum LogType {
  Log = 'log',
  Warn = 'warn',
  Err = 'error',
}
type ItemType = {
  time: string; //记录的时间
  type: LogType; // 类型
  url: string;
  info: string;
  err?: unknown;
  title: string;
  moreInfo?: string;
};
type StateType = {
  visible: boolean;
  list: Array<ItemType>;
};
export const useLogStore = defineStore({
  id: 'log',
  state(): StateType {
    return {
      visible: false,
      list: [],
    };
  },
  getters: {
    count(state): number {
      return state.list.length || 0;
    },
  },
  actions: {
    clear(): void {
      this.list = [];
    },
    switchVisible(): void {
      this.visible = !this.visible;
    },
    add(item: ItemType): void {
      if (this.list.length >= maxLen) {
        this.list.pop();
      }
      this.list = [item].concat(this.list);
    },
  },
});
