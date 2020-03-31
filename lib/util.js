import moment from "moment";

moment.locale("zh-cn");
export const genDetailCacheKey = ctx => {
  const { query, pathname } = ctx;
  const { owner, name } = query;
  return `${pathname}-${owner}-${name}`;
};

export const genDetailCacheKeyStrate = context => {
  const { ctx } = context;
  return genDetailCacheKey(ctx);
};

export const genCacheKeyByQuery = query => {
  //Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的object上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致
  //reduce 累加 初始值为空
  return Object.keys(query).reduce((prev, cur) => {
    prev += query[cur];
    return prev;
  }, "");
};

export function getTimeFromNow(time) {
  return moment(time).fromNow();
}
