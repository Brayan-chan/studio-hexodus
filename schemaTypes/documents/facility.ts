import {ImageIcon} from '@sanity/icons/Image'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const facility = defineType({
  name: 'facility',
  title: 'Fotografía de instalaciones',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({name: 'title', title: 'Nombre corto', type: 'string', validation: (rule) => rule.required().max(70)}),
    defineField({
      name: 'sourceKey',
      title: 'Identificador interno',
      type: 'slug',
      options: {source: 'title'},
      readOnly: ({document}) => Boolean(document?._createdAt),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Tipo de recurso',
      type: 'string',
      initialValue: 'image',
      options: {layout: 'radio', list: [{title: 'Imagen', value: 'image'}, {title: 'Video', value: 'video'}]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'accessibleImage',
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType === 'video',
      validation: (rule) => rule.custom((value, context) => (context.parent as {mediaType?: string})?.mediaType === 'video' || value ? true : 'La imagen es obligatoria'),
    }),
    defineField({
      name: 'video',
      title: 'Video MP4',
      type: 'file',
      options: {accept: 'video/mp4'},
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'video',
      validation: (rule) => rule.custom((value, context) => (context.parent as {mediaType?: string})?.mediaType !== 'video' || value ? true : 'El video es obligatorio'),
    }),
    defineField({
      name: 'poster',
      title: 'Portada del video',
      type: 'accessibleImage',
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'video',
      validation: (rule) => rule.custom((value, context) => (context.parent as {mediaType?: string})?.mediaType !== 'video' || value ? true : 'La portada es obligatoria'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Pesas y fuerza', value: 'fuerza'},
          {title: 'Máquinas', value: 'maquinas'},
          {title: 'Cardio', value: 'cardio'},
          {title: 'Instalaciones', value: 'instalaciones'},
          {title: 'Comunidad', value: 'comunidad'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'tag', title: 'Etiqueta', type: 'string', validation: (rule) => rule.required().max(40)}),
    defineField({
      name: 'placements',
      title: 'Dónde aparece',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'grid',
        list: [
          {title: 'Carrusel del inicio', value: 'home'},
          {title: 'Página de galería', value: 'gallery'},
        ],
      },
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      initialValue: 'active',
      options: {layout: 'radio', list: [{title: 'Visible', value: 'active'}, {title: 'Oculta', value: 'inactive'}]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'order', title: 'Orden', type: 'number', validation: (rule) => rule.required().integer().min(0)}),
  ],
  orderings: [{title: 'Orden editorial', name: 'editorialOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', category: 'category', image: 'image', poster: 'poster', status: 'status'},
    prepare: ({title, category, image, poster, status}) => ({
      title,
      subtitle: `${category ?? 'Sin categoría'}${status === 'inactive' ? ' · Oculta' : ''}`,
      media: image ?? poster,
    }),
  },
})
