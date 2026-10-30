import {CreditCardIcon} from '@sanity/icons/CreditCard'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const membershipPlan = defineType({
  name: 'membershipPlan',
  title: 'Membresía o pase',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'sourceKey',
      title: 'Identificador interno',
      type: 'slug',
      options: {source: 'name'},
      readOnly: ({document}) => Boolean(document?._createdAt),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Membresía mensual', value: 'monthly'},
          {title: 'Pase de corta duración', value: 'pass'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Precio',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0).max(100000),
    }),
    defineField({
      name: 'currency',
      title: 'Moneda',
      type: 'string',
      initialValue: 'MXN',
      readOnly: true,
      options: {list: [{title: 'Peso mexicano (MXN)', value: 'MXN'}]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Texto junto al precio',
      type: 'string',
      hidden: ({parent}) => parent?.kind !== 'monthly',
      validation: (rule) => rule.max(50),
    }),
    defineField({
      name: 'tag',
      title: 'Etiqueta destacada',
      type: 'string',
      hidden: ({parent}) => parent?.kind !== 'monthly',
      validation: (rule) => rule.max(35),
    }),
    defineField({
      name: 'features',
      title: 'Beneficios',
      type: 'array',
      hidden: ({parent}) => parent?.kind !== 'monthly',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(8).unique(),
    }),
    defineField({
      name: 'actionLabel',
      title: 'Texto del botón',
      type: 'string',
      hidden: ({parent}) => parent?.kind !== 'monthly',
      validation: (rule) => rule.max(45),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje de WhatsApp',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.kind !== 'monthly',
      validation: (rule) => rule.max(500),
    }),
    defineField({name: 'featured', title: 'Plan destacado', type: 'boolean', initialValue: false}),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      initialValue: 'active',
      options: {
        layout: 'radio',
        list: [
          {title: 'Visible', value: 'active'},
          {title: 'Oculto', value: 'inactive'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [{title: 'Orden editorial', name: 'editorialOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', amount: 'amount', kind: 'kind', status: 'status'},
    prepare: ({title, amount, kind, status}) => ({
      title,
      subtitle: `${kind === 'pass' ? 'Pase' : 'Membresía'} · $${amount ?? 0} MXN${status === 'inactive' ? ' · Oculto' : ''}`,
    }),
  },
})
