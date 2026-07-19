import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const singletons = [
  { type: "homepage", title: "Homepage" },
  { type: "aboutPage", title: "About page" },
  { type: "contactPage", title: "Contact page" },
  { type: "socialMediaPage", title: "Social media page" },
];

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.divider(),
      ...singletons.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .id(singleton.type)
          .child(
            S.document().schemaType(singleton.type).documentId(singleton.type)
          )
      ),
    ]);

export default defineConfig({
  name: "elvira-nisman",
  title: "Elvira Nisman",
  projectId: "357jdsq3",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) => !singletons.some((s) => s.type === template.schemaType)
      ),
  },
  document: {
    actions: (actions, context) =>
      singletons.some((s) => s.type === context.schemaType)
        ? actions.filter(
            (action) =>
              !["unpublish", "delete", "duplicate"].includes(action.action ?? "")
          )
        : actions,
  },
});
