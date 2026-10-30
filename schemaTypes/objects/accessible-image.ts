import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Imagen',
  type: 'image',
  icon: ImageIcon,
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Describe la imagen para accesibilidad y buscadores.',
      validation: (rule) => rule.required().min(5).max(180),
    }),
    defineField({
      name: 'caption',
      title: 'Pie de foto',
      type: 'string',
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'asset'},
  },
})
