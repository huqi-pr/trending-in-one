#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json
import { assertEquals, assertStringIncludes } from "std/testing/asserts.ts";
import type { Question, SearchWord, Word, ToutiaoWord } from "./types.ts";

import {
  createArchive,
  createTuotiaoList,
  createReadme,
  mergeWords,
  mergeQuestions,
  mergeWords4Toutiao,
  mergeWords4Weibo,
  createWeiboList,
  createQuestionList,
  createReadme4Toutiao,
  createArchive4Toutiao,
  createArchive4Weibo,
  createReadme4Weibo,
  createReadme4Search,
  createArchive4Search,
  createSearchList,
} from "./utils.ts";

Deno.test("mergeWords4Toutiao", function (): void {
  const words1: ToutiaoWord[] = [];
  const words2: ToutiaoWord[] = [{ word: "foo", url: "bar" }];
  const words3: ToutiaoWord[] = [{ word: "foo", url: "hello" }];
  const words4: ToutiaoWord[] = [{ word: "hello", url: "world" }];
  const words5: ToutiaoWord[] = [
    { word: "foo", url: "bar" },
    { word: "hello", url: "world" },
  ];

  assertEquals(mergeWords4Toutiao(words1, words2), words2);
  assertEquals(mergeWords4Toutiao(words1, words5), words5);
  assertEquals(mergeWords4Toutiao(words2, words2), words2);
  assertEquals(
    mergeWords4Toutiao(words2, words3),
    [
      { word: "foo", url: "bar" },
      { word: "foo", url: "hello" },
    ],
  );
  assertEquals(mergeWords4Toutiao(words4, words5), [
    { word: "hello", url: "world" },
    { word: "foo", url: "bar" },
  ]);
  assertEquals(
    mergeWords4Toutiao(words3, words5),
    [
      { word: "foo", url: "hello" },
      { word: "foo", url: "bar" },
      { word: "hello", url: "world" },
    ],
  );
});

Deno.test("createTuotiaoList", function (): void {
  const words: ToutiaoWord[] = [
    { word: "foo", url: "bar" },
    { word: "hello", url: "world" },
  ];

  assertStringIncludes(createTuotiaoList(words), "<!-- BEGIN TOUTIAO -->");
  assertStringIncludes(createTuotiaoList(words), "<!-- END TOUTIAO -->");
  assertStringIncludes(createTuotiaoList(words), "foo");
  assertStringIncludes(createTuotiaoList(words), "world");
  assertStringIncludes(createTuotiaoList(words), "hello");
});

Deno.test("createArchive4Toutiao", function (): void {
  const words: ToutiaoWord[] = [
    { word: "foo", url: "bar" },
    { word: "hello", url: "world" },
  ];

  assertStringIncludes(
    createArchive4Toutiao(words, "2020-02-02"),
    "# 2020-02-02",
  );
  assertStringIncludes(createArchive4Toutiao(words, "2020-02-02"), "共 2 条");
});

Deno.test("createReadme4Toutiao", async function (): Promise<void> {
  const words: ToutiaoWord[] = [
    { word: "foo", url: "bar" },
    { word: "hello", url: "world" },
  ];

  assertStringIncludes(await createReadme4Toutiao(words), "头条");
  assertStringIncludes(
    await createReadme4Toutiao(words),
    "zhihu-trending-hot-questions",
  );
});

Deno.test("mergeQuestions", function (): void {
  const words1: Question[] = [];
  const words2: Question[] = [{ title: "foo", url: "bar" }];
  const words3: Question[] = [{ title: "foo", url: "hello" }];
  const words4: Question[] = [{ title: "hello", url: "world" }];
  const words5: Question[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertEquals(mergeQuestions(words1, words2), words2);
  assertEquals(mergeQuestions(words1, words5), words5);
  assertEquals(mergeQuestions(words2, words2), words2);
  assertEquals(
    mergeQuestions(words2, words3),
    [
      { title: "foo", url: "bar" },
      { title: "foo", url: "hello" },
    ],
  );
  assertEquals(mergeQuestions(words4, words5), [
    { title: "hello", url: "world" },
    { title: "foo", url: "bar" },
  ]);
  assertEquals(
    mergeQuestions(words3, words5),
    [
      { title: "foo", url: "hello" },
      { title: "foo", url: "bar" },
      { title: "hello", url: "world" },
    ],
  );
});

Deno.test("createQuestionList", function (): void {
  const words: Question[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertStringIncludes(
    createQuestionList(words),
    "<!-- BEGIN ZHIHUQUESTIONS -->",
  );
  assertStringIncludes(
    createQuestionList(words),
    "<!-- END ZHIHUQUESTIONS -->",
  );
  assertStringIncludes(createQuestionList(words), "foo");
  assertStringIncludes(createQuestionList(words), "world");
  assertStringIncludes(createQuestionList(words), "hello");
});

Deno.test("createArchive", function (): void {
  const words: Question[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertStringIncludes(createArchive(words, "2020-02-02"), "# 2020-02-02");
  assertStringIncludes(createArchive(words, "2020-02-02"), "共 2 条");
});

Deno.test("createReadme", async function (): Promise<void> {
  const words: Question[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertStringIncludes(await createReadme(words), "热门");
  assertStringIncludes(
    await createReadme(words),
    "zhihu-trending-hot-questions",
  );
});

Deno.test("mergeWords4Weibo", function (): void {
  const words1: Word[] = [];
  const words2: Word[] = [{ title: "foo", url: "bar" }];
  const words3: Word[] = [{ title: "foo", url: "hello" }];
  const words4: Word[] = [{ title: "hello", url: "world" }];
  const words5: Word[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertEquals(mergeWords4Weibo(words1, words2), words2);
  assertEquals(mergeWords4Weibo(words1, words5), words5);
  assertEquals(mergeWords4Weibo(words2, words2), words2);
  assertEquals(
    mergeWords4Weibo(words2, words3),
    [
      { title: "foo", url: "bar" },
      { title: "foo", url: "hello" },
    ],
  );
  assertEquals(mergeWords4Weibo(words4, words5), [
    { title: "hello", url: "world" },
    { title: "foo", url: "bar" },
  ]);
  assertEquals(
    mergeWords4Weibo(words3, words5),
    [
      { title: "foo", url: "hello" },
      { title: "foo", url: "bar" },
      { title: "hello", url: "world" },
    ],
  );
});

Deno.test("createWeiboList", function (): void {
  const words: Word[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertStringIncludes(createWeiboList(words), "<!-- BEGIN WEIBO -->");
  assertStringIncludes(createWeiboList(words), "<!-- END WEIBO -->");
  assertStringIncludes(createWeiboList(words), "foo");
  assertStringIncludes(createWeiboList(words), "world");
  assertStringIncludes(createWeiboList(words), "hello");
});

Deno.test("createArchive4Weibo", function (): void {
  const words: Word[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertStringIncludes(
    createArchive4Weibo(words, "2020-02-02"),
    "# 2020-02-02",
  );
  assertStringIncludes(createArchive4Weibo(words, "2020-02-02"), "共 2 条");
});

Deno.test("createReadme4Weibo", async function (): Promise<void> {
  const words: Word[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertStringIncludes(await createReadme4Weibo(words), "微博");
  assertStringIncludes(
    await createReadme4Weibo(words),
    "zhihu-trending-hot-questions",
  );
});

Deno.test("mergeWords", function (): void {
  const words1: SearchWord[] = [];
  const words2: SearchWord[] = [{ query: "foo", display_query: "bar" }];
  const words3: SearchWord[] = [{ query: "foo", display_query: "hello" }];
  const words4: SearchWord[] = [{ query: "hello", display_query: "world" }];
  const words5: SearchWord[] = [
    { query: "foo", display_query: "bar" },
    { query: "hello", display_query: "world" },
  ];

  assertEquals(mergeWords(words1, words2), words2);
  assertEquals(mergeWords(words1, words5), words5);
  assertEquals(mergeWords(words2, words2), words2);
  assertEquals(
    mergeWords(words2, words3),
    [
      { query: "foo", display_query: "bar" },
      { query: "foo", display_query: "hello" },
    ],
  );
  assertEquals(mergeWords(words4, words5), [
    { query: "hello", display_query: "world" },
    { query: "foo", display_query: "bar" },
  ]);
  assertEquals(
    mergeWords(words3, words5),
    [
      { query: "foo", display_query: "hello" },
      { query: "foo", display_query: "bar" },
      { query: "hello", display_query: "world" },
    ],
  );
});

Deno.test("createSearchList", function (): void {
  const words: SearchWord[] = [
    { query: "foo", display_query: "bar" },
    { query: "hello", display_query: "world" },
  ];

  assertStringIncludes(createSearchList(words), "<!-- BEGIN ZHIHUSEARCH -->");
  assertStringIncludes(createSearchList(words), "<!-- END ZHIHUSEARCH -->");
  assertStringIncludes(createSearchList(words), "foo");
  assertStringIncludes(createSearchList(words), "world");
  assertStringIncludes(createSearchList(words), "hello");
});

Deno.test("createArchive4Search", function (): void {
  const words: SearchWord[] = [
    { query: "foo", display_query: "bar" },
    { query: "hello", display_query: "world" },
  ];

  assertStringIncludes(
    createArchive4Search(words, "2020-02-02"),
    "# 2020-02-02",
  );
  assertStringIncludes(createArchive4Search(words, "2020-02-02"), "共 2 条");
});

Deno.test("createReadme4Search", async function (): Promise<void> {
  const words: SearchWord[] = [
    { query: "foo", display_query: "bar" },
    { query: "hello", display_query: "world" },
  ];

  assertStringIncludes(await createReadme4Search(words), "热搜");
  assertStringIncludes(
    await createReadme4Search(words),
    "zhihu-trending-hot-questions",
  );
});
