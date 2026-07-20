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
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "url",
                      type: "url",
                      description: "Optional link to the exhibition",
                    }),
                  ],
                  preview: { select: { title: "title", subtitle: "url" } },
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
