export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"backend\":{\"path\":\"/category/backend/\",\"indexes\":[0,1,2,3,4,5,6,7,8,9,10]},\"code\":{\"path\":\"/category/code/\",\"indexes\":[11,12,13,14,15,16,17,18,19,20,21]},\"ds\":{\"path\":\"/category/ds/\",\"indexes\":[22,23]},\"mdi:bash\":{\"path\":\"/category/mdibash/\",\"indexes\":[24]},\"golang\":{\"path\":\"/category/golang/\",\"indexes\":[25,26,27]},\"finetune\":{\"path\":\"/category/finetune/\",\"indexes\":[28]},\"cv\":{\"path\":\"/category/cv/\",\"indexes\":[29,30,31,32,33]},\"notes\":{\"path\":\"/category/notes/\",\"indexes\":[34,35,36]},\"llm\":{\"path\":\"/category/llm/\",\"indexes\":[37,38,39,40]},\"pytorch\":{\"path\":\"/category/pytorch/\",\"indexes\":[41,42]},\"primer\":{\"path\":\"/category/primer/\",\"indexes\":[43,44,45]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

