export const typesMap = JSON.parse("{\"article\":{\"/\":{\"path\":\"/article/\",\"indexes\":[24,25,26,11,12,13,14,15,16,27,17,18,19,20,0,41,42,34,44,35,29,22,30,31,36,43,37,32,28,1,45,2,3,4,5,6,7,38,33,23,8,9,10,39,40,21,46,47]}},\"star\":{\"/\":{\"path\":\"/star/\",\"indexes\":[]}},\"timeline\":{\"/\":{\"path\":\"/timeline/\",\"indexes\":[24,25,26,11,12,13,14,15,16,27,17,18,19,20,0,41,42,34,44,35,29,22,30,31,36,43,37,32,28,1,45,2,3,4,5,6,7,38,33,23,8,9,10,39,40,21]}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

