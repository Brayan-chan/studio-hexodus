import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO y redes sociales',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título SEO',
      type: 'string',
      description: 'Usa {name} para insertar el nombre del gimnasio.',
      validation: (rule) => rule.required().max(65),
    }),
    defineField({
      name: 'description',
      title: 'Descripción SEO',
      type: 'text',
      rows: 3,
      description: 'Usa {name} para insertar el nombre del gimnasio.',
      validation: (rule) => rule.required().min(80).max(170),
    }),
    defineField({
      name: 'image',
      title: 'Imagen para compartir',
      type: 'accessibleImage',
      validation: (rule) => rule.required(),
    }),
  ],
})
