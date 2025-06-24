declare module '*/content.json' {
  interface ValueContent {
    text: string;
    image: string;
  }

  interface CategoryContent {
    [key: string]: ValueContent;
  }

  interface ContentData {
    P: CategoryContent;
    O: CategoryContent;
    O: CategoryContent;
    K: CategoryContent;
    [key: string]: CategoryContent;
  }

  const content: ContentData;
  export default content;
}

declare module '*/categories.json' {
  const categories: string[];
  export default categories;
} 