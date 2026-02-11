export const typesMap = JSON.parse("{\"article\":{\"/\":{\"path\":\"/article/\",\"indexes\":[24,25,26,0,1,2,3,4,5,27,6,7,8,9,11,41,42,34,44,35,29,22,30,31,36,43,37,32,28,12,45,13,14,15,16,17,18,38,33,23,19,20,21,39,40,10,46,47,48]}},\"star\":{\"/\":{\"path\":\"/star/\",\"indexes\":[]}},\"timeline\":{\"/\":{\"path\":\"/timeline/\",\"indexes\":[24,25,26,0,1,2,3,4,5,27,6,7,8,9,11,41,42,34,44,35,29,22,30,31,36,43,37,32,28,12,45,13,14,15,16,17,18,38,33,23,19,20,21,39,40,10]}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

