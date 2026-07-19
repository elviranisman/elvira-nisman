import { defineField, defineType } from "sanity";

export const socialMediaPage = defineType({
  name: "socialMediaPage",
  title: "Social media page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "calendlyUrl",
      type: "url",
      description: "Booking link used by all buttons on this page",
    }),
    defineField({
      name: "services",
      type: "array",
      of: [
        {
          type: "object",
          name: "service",
          fields: [
            defineField({ name: "number", type: "string" }),
            defineField({
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "text", type: "text", rows: 5 }),
          ],
          preview: { select: { title: "name", subtitle: "number" } },
        },
      ],
    }),
    defineField({
      name: "reels",
      type: "array",
      of: [
        {
          type: "object",
          name: "reel",
          fields: [
            defineField({
              name: "video",
              type: "file",
              options: { accept: "video/mp4" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "kind",
              type: "string",
              description: "Small label, e.g. Content creation / UGC content",
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              description: "Instagram reel link",
            }),
          ],
          preview: { select: { title: "title", subtitle: "kind" } },
        },
      ],
    }),
    defineField({
      name: "feedback",
      type: "array",
      of: [
        {
          type: "object",
          name: "review",
          fields: [
            defineField({
              name: "quote",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "client",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "client", subtitle: "quote" } },
        },
      ],
    }),
    defineField({ name: "collabLabel", type: "string" }),
    defineField({ name: "collabTitle", type: "string" }),
    defineField({ name: "collabText", type: "text", rows: 4 }),
    defineField({ name: "ctaLabel", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Social media page" }),
  },
});
