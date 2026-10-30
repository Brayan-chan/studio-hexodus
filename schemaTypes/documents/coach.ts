import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const coach = defineType({
  name: 'coach',
  title: 'Coach',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required().max(80)}),
    defineField({name: 'role', title: 'Especialidad / cargo', type: 'string', validation: (rule) => rule.required().max(120)}),
    defineField({name: 'bio', title: 'Descripción breve', type: 'text', rows: 3, validation: (rule) => rule.required().max(240)}),
    defineField({name: 'photo', title: 'Fotografía', type: 'accessibleImage'}),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      initialValue: 'active',
      options: {layout: 'radio', list: [{title: 'Visible', value: 'active'}, {title: 'Oculto', value: 'inactive'}]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'order', title: 'Orden', type: 'number', validation: (rule) => rule.required().integer().min(0)}),
  ],
  orderings: [{title: 'Orden editorial', name: 'editorialOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
