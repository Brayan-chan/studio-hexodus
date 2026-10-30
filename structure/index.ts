import {CogIcon} from '@sanity/icons/Cog'
import {CreditCardIcon} from '@sanity/icons/CreditCard'
import {HomeIcon} from '@sanity/icons/Home'
import {ImagesIcon} from '@sanity/icons/Images'
import {PinIcon} from '@sanity/icons/Pin'
import {SparklesIcon} from '@sanity/icons/Sparkles'
import {UserIcon} from '@sanity/icons/User'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

export const singletonTypes = new Set(['siteSettings', 'homePage', 'contactPage', 'galleryPage'])

const singleton = (
  S: StructureBuilder,
  typeName: string,
  documentId: string,
  title: string,
  icon: ComponentType,
) =>
  S.listItem()
    .id(documentId)
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(documentId).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido de Hexodus')
    .items([
      singleton(S, 'siteSettings', 'siteSettings', 'Configuración general', CogIcon),
      S.divider(),
      S.listItem()
        .title('Páginas')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Páginas')
            .items([
              singleton(S, 'homePage', 'homePage', 'Inicio', HomeIcon),
              singleton(S, 'galleryPage', 'galleryPage', 'Galería', ImagesIcon),
              singleton(S, 'contactPage', 'contactPage', 'Contacto', PinIcon),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('membershipPlan').title('Membresías y pases').icon(CreditCardIcon),
      S.documentTypeListItem('promotion').title('Promociones').icon(SparklesIcon),
      S.documentTypeListItem('coach').title('Coaches').icon(UserIcon),
      S.documentTypeListItem('facility').title('Instalaciones y galería').icon(ImagesIcon),
    ])
