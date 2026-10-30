import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Botón / enlace',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Texto del botón',
      type: 'string',
      validation: (rule) => rule.required().max(45),
    }),
    defineField({
      name: 'kind',
      title: 'Destino',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        list: [
          {title: 'Sección o página del sitio', value: 'internal'},
          {title: 'WhatsApp', value: 'whatsapp'},
          {title: 'Sitio externo', value: 'external'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalTarget',
      title: 'Sección o página',
      type: 'string',
      options: {
        list: [
          {title: 'Inicio', value: '/#inicio'},
          {title: 'Beneficios', value: '/#beneficios'},
          {title: 'Membresías', value: '/#membresias'},
          {title: 'Nosotros', value: '/#nosotros'},
          {title: 'Equipo', value: '/#equipo'},
          {title: 'Galería', value: '/galeria/'},
          {title: 'Contacto', value: '/contacto/'},
        ],
      },
      hidden: ({parent}) => parent?.kind !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) =>
          context.parent && (context.parent as {kind?: string}).kind === 'internal' && !value
            ? 'Selecciona un destino'
            : true,
        ),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje de WhatsApp',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.kind !== 'whatsapp',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL externa',
      type: 'url',
      hidden: ({parent}) => parent?.kind !== 'external',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).custom((value, context) =>
          context.parent && (context.parent as {kind?: string}).kind === 'external' && !value
            ? 'Ingresa la URL externa'
            : true,
        ),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'kind'},
    prepare: ({title, subtitle}) => ({
      title,
      subtitle:
        subtitle === 'whatsapp'
          ? 'WhatsApp'
          : subtitle === 'external'
            ? 'Enlace externo'
            : 'Enlace interno',
    }),
  },
})
