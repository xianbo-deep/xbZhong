export const typesMap = JSON.parse("{\"article\":{\"/\":{\"path\":\"/article/\",\"indexes\":[22,23,24,0,1,2,3,4,5,25,6,7,8,9,11,38,39,34,44,35,28,26,29,30,36,40,37,31,33,12,45,13,14,15,16,17,18,41,32,27,19,20,21,42,43,10,46,47,48]}},\"star\":{\"/\":{\"path\":\"/star/\",\"indexes\":[]}},\"timeline\":{\"/\":{\"path\":\"/timeline/\",\"indexes\":[22,23,24,0,1,2,3,4,5,25,6,7,8,9,11,38,39,34,44,35,28,26,29,30,36,40,37,31,33,12,45,13,14,15,16,17,18,41,32,27,19,20,21,42,43,10]}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

