import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          name: "contactItem",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              type: "string",
              description: "The text shown on the page",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              type: "string",
              description:
                "Link target, e.g. mailto:hello@… or https://instagram.com/…",
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact page" }),
  },
});
