#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json
import { assertEquals, assertStringIncludes } from "std/testing/asserts.ts";
import type { Question } from "./types.ts";

import {
  createArchive,
  createList,
  createReadme,
  mergeQuestions,
} from "./utils.ts";

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

Deno.test("createList", function (): void {
  const words: Question[] = [
    { title: "foo", url: "bar" },
    { title: "hello", url: "world" },
  ];

  assertStringIncludes(createList(words), "<!-- BEGIN -->");
  assertStringIncludes(createList(words), "<!-- END -->");
  assertStringIncludes(createList(words), "foo");
  assertStringIncludes(createList(words), "world");
  assertStringIncludes(createList(words), "hello");
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

  assertStringIncludes(await createReadme(words), "知乎");
  assertStringIncludes(
    await createReadme(words),
    "zhihu-trending-hot-questions",
  );
});
