import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Página de galería',
  type: 'document',
  icon: ImagesIcon,
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
        defineField({name: 'badge', title: 'Etiqueta', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'heading', title: 'Título', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'highlight', title: 'Texto destacado', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'intro', title: 'Introducción', type: 'text', rows: 4, validation: (rule) => rule.required().max(420)}),
        defineField({
          name: 'chips',
          title: 'Indicadores',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'galleryChip',
              title: 'Indicador',
              type: 'object',
              fields: [
                defineField({name: 'value', title: 'Valor', type: 'string', validation: (rule) => rule.required().max(15)}),
                defineField({name: 'label', title: 'Descripción', type: 'string', validation: (rule) => rule.required().max(45)}),
              ],
              preview: {select: {title: 'value', subtitle: 'label'}},
            }),
          ],
          validation: (rule) => rule.required().min(1).max(5),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Cierre de página',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'eyebrow', title: 'Antetítulo', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'heading', title: 'Título', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'highlight', title: 'Texto destacado', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'copy', title: 'Descripción', type: 'text', rows: 3, validation: (rule) => rule.required().max(320)}),
        defineField({name: 'primaryCta', title: 'Botón principal', type: 'callToAction', validation: (rule) => rule.required()}),
        defineField({name: 'secondaryCta', title: 'Botón secundario', type: 'callToAction', validation: (rule) => rule.required()}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo', validation: (rule) => rule.required()}),
  ],
  preview: {prepare: () => ({title: 'Página de galería'})},
})
