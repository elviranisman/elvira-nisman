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
    defineField({
      name: "exhibitions",
      title: "Selected exhibitions",
      type: "array",
      of: [
        {
          type: "object",
          name: "exhibitionYear",
          fields: [
            defineField({
              name: "year",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "entries",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "exhibitionEntry",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Full line",
                      type: "string",
                      description:
                        "The whole line, e.g. SOLO Digital Show - Studio 111",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "highlight",
                      title: "Words in accent colour",
                      type: "string",
                      description:
                        "Optional. The part of the line to show in the accent colour, e.g. Studio 111. Leave empty to keep the whole line plain.",
                    }),
                    defineField({
                      name: "url",
                      title: "Link",
                      type: "url",
                      description:
                        "Optional. Makes the accent words clickable.",
                    }),
                  ],
                  preview: {
                    select: { title: "title", subtitle: "highlight" },
                  },
                },
              ],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: { select: { title: "year" } },
        },
      ],
    }),
    defineField({
      name: "testimonials",
      type: "array",
      of: [
        {
          type: "object",
          name: "testimonial",
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
    defineField({ name: "printsTitle", type: "string" }),
    defineField({ name: "printsText", type: "text", rows: 3 }),
  ],
  preview: {
    prepare: () => ({ title: "About page" }),
  },
});
