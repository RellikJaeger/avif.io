import { makeSource } from "contentlayer/source-files";
import { defineDocumentType } from "contentlayer/source-files";

export const abstractDocumentFrontMatter = {
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  keyword: {
    type: "string",
  },
  datePublished: {
    type: "date",
  },
  dateModified: {
    type: "date",
  },
  sources: {
    type: "json",
  },
  tags: {
    type: "json",
  },
  questions: {
    type: "json",
  },
};

export const Articles = defineDocumentType(() => ({
  name: "Articles",
  filePathPattern: `articles/*.mdx`,
  contentType: "mdx",
  fields: { ...abstractDocumentFrontMatter },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => "blog/" + doc._raw.flattenedPath,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    category: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").shift(),
    },
  },
}));

export const Comparisons = defineDocumentType(() => ({
  name: "Comparisons",
  filePathPattern: `comparisons/*.mdx`,
  contentType: "mdx",
  fields: { ...abstractDocumentFrontMatter },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => "blog/" + doc._raw.flattenedPath,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    category: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").shift(),
    },
  },
}));

export const FAQs = defineDocumentType(() => ({
  name: "FAQs",
  filePathPattern: `faq/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    answer: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    datePublished: {
      type: "date",
    },
    dateModified: {
      type: "date",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => "blog/" + doc._raw.flattenedPath,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    category: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").shift(),
    },
  },
}));

export const Tutorials = defineDocumentType(() => ({
  name: "Tutorials",
  filePathPattern: `tutorials/*.mdx`,
  contentType: "mdx",
  fields: {
    ...abstractDocumentFrontMatter,
    subcategory: {
      type: "string",
      required: true,
    },
    support: {
      type: "enum",
      options: ["full", "partial", "no"],
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => "blog/" + doc._raw.flattenedPath,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    category: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").shift(),
    },
  },
}));

export default makeSource({
  contentDirPath: "blog",
  documentTypes: [Articles, Comparisons, FAQs, Tutorials],
});
