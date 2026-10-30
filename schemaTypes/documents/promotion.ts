import {SparklesIcon} from '@sanity/icons/Sparkles'
import {defineField, defineType} from 'sanity'

export const promotion = defineType({
  name: 'promotion',
  title: 'Promoción',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({name: 'label', title: 'Nombre', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'sourceKey',
      title: 'Identificador interno',
      type: 'slug',
      options: {source: 'label'},
      readOnly: ({document}) => Boolean(document?._createdAt),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Importe promocional',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({name: 'terms', title: 'Términos', type: 'text', rows: 4, validation: (rule) => rule.max(600)}),
    defineField({name: 'startsAt', title: 'Inicio', type: 'datetime'}),
    defineField({name: 'endsAt', title: 'Finaliza', type: 'datetime'}),
    defineField({name: 'active', title: 'Promoción activa', type: 'boolean', initialValue: true}),
    defineField({
      name: 'confirmed',
      title: 'Importe confirmado con el cliente',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'termsConfirmed',
      title: 'Términos confirmados con el cliente',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'label', amount: 'amount', active: 'active'},
    prepare: ({title, amount, active}) => ({
      title,
      subtitle: `$${amount ?? 0} MXN${active ? ' · Activa' : ' · Inactiva'}`,
    }),
  },
})
