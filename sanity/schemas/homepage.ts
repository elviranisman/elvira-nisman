import { defineArrayMember, defineField, defineType } from "sanity";

const entryFields = [
  defineField({
    name: "project",
    type: "reference",
    to: [{ type: "project" }],
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "image",
    type: "image",
    description: "The image shown in this slot",
    validation: (rule) => rule.required(),
  }),
];

const modulePreview = {
  select: { title: "project.title", media: "image" },
};

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "modules",
      description:
        "The homepage feed, top to bottom. Leave empty to let the site compose it automatically from all projects.",
      type: "array",
      of: [
        defineArrayMember({
          name: "heroModule",
          title: "Hero — full width opener",
          type: "object",
          fields: entryFields,
          preview: modulePreview,
        }),
        defineArrayMember({
          name: "singleModule",
          title: "Single — centered image",
          type: "object",
          fields: entryFields,
          preview: modulePreview,
        }),
        defineArrayMember({
          name: "wideModule",
          title: "Wide — full bleed (landscape images only)",
          type: "object",
          fields: entryFields,
          preview: modulePreview,
        }),
        defineArrayMember({
          name: "duoModule",
          title: "Duo — two images side by side",
          type: "object",
          fields: [
            defineField({
              name: "first",
              type: "object",
              fields: entryFields,
            }),
            defineField({
              name: "second",
              type: "object",
              fields: entryFields,
            }),
          ],
          preview: {
            select: {
              first: "first.project.title",
              second: "second.project.title",
              media: "first.image",
            },
            prepare: ({ first, second, media }) => ({
              title: `${first ?? "…"} + ${second ?? "…"}`,
              media,
            }),
          },
        }),
        defineArrayMember({
          name: "quoteModule",
          title: "Quote — text beside an image",
          type: "object",
          fields: [
            defineField({
              name: "text",
              type: "text",
              rows: 3,
              description: "Leave empty to use the project description",
            }),
            ...entryFields,
          ],
          preview: modulePreview,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
