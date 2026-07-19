import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { BatchImagesInput } from "../components/BatchImagesInput";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      description: "Shown under the title in captions",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Editorials", value: "editorials" },
          { title: "Commercial", value: "commercial" },
          { title: "Portrait", value: "portrait" },
          { title: "Events", value: "events" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portraitType",
      title: "Portrait filter",
      type: "string",
      options: {
        list: [
          { title: "Artists", value: "artists" },
          { title: "People", value: "people" },
        ],
        layout: "radio",
      },
      hidden: ({ document }) => document?.category !== "portrait",
    }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "location", type: "string", initialValue: "Berlin" }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      description: "Used for pull quotes on the homepage",
    }),
    defineField({
      name: "cover",
      type: "image",
      description: "Shown on category pages and used as the main image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      components: { input: BatchImagesInput },
      validation: (rule) => rule.min(1),
    }),
    orderRankField({ type: "project" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
  },
});
