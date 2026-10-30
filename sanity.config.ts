import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {singletonTypes, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Hexodus',

  projectId: 'yr2v9nsi',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    newDocumentOptions: (previous) =>
      previous.filter(({templateId}) => !singletonTypes.has(templateId)),
    actions: (previous, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? previous.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : previous,
  },
})
