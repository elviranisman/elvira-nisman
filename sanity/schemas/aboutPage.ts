import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "portrait",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [{ type: "text", rows: 5 }],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "printsTitle", type: "string" }),
    defineField({ name: "printsText", type: "text", rows: 3 }),
  ],
  preview: {
    prepare: () => ({ title: "About page" }),
  },
});
