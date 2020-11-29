export type ZhihuVideoItem = {
  target: {
    title_area: {
      text: string;
    };
    link: {
      url: string;
    };
  };
};

export type Question = {
  title: string;
  url: string;
};

export type ZhihuVideoList = {
  data: ZhihuVideoItem[];
};

export type ZhihuQuestionItem = {
  target: {
    title: string;
    id: number;
  };
};

export type ZhihuQuestionList = {
  data: ZhihuQuestionItem[];
};

export type SearchWord = {
  query: string;
  display_query: string;
  url?: string;
};

export type TopSearch = {
  top_search: {
    words: SearchWord[];
  };
};

export type Word = {
  title: string;
  url: string;
  realurl?: string;
};

export type ToutiaoTopSearch = {
  data: [
    {
      words: ToutiaoWord[];
    },
  ];
};

export type ToutiaoWord = {
  word: string;
  url: string;
};
