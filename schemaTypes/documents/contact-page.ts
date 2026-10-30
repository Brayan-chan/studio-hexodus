import {PinIcon} from '@sanity/icons/Pin'
import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Página de contacto',
  type: 'document',
  icon: PinIcon,
  groups: [
    {name: 'content', title: 'Contenido', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Portada',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'eyebrow', title: 'Antetítulo', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'heading', title: 'Título', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'highlight', title: 'Texto destacado', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'intro', title: 'Introducción', type: 'text', rows: 3, validation: (rule) => rule.required().max(300)}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactSection',
      title: 'Sección de contacto',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'label', title: 'Etiqueta', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'heading', title: 'Título', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'highlight', title: 'Texto destacado', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'intro', title: 'Introducción', type: 'text', rows: 3, validation: (rule) => rule.required()}),
        defineField({name: 'whatsappTitle', title: 'Título WhatsApp', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'whatsappCopy', title: 'Texto WhatsApp', type: 'text', rows: 2, validation: (rule) => rule.required()}),
        defineField({name: 'whatsappButton', title: 'Texto del botón', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'locationImage', title: 'Fotografía', type: 'accessibleImage', validation: (rule) => rule.required()}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapSection',
      title: 'Sección del mapa',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'label', title: 'Etiqueta', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'heading', title: 'Título', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'highlight', title: 'Texto destacado', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'buttonLabel', title: 'Texto del botón', type: 'string', validation: (rule) => rule.required()}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo', validation: (rule) => rule.required()}),
  ],
  preview: {prepare: () => ({title: 'Página de contacto'})},
})
