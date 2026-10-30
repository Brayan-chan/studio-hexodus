import {coach} from './documents/coach'
import {contactPage} from './documents/contact-page'
import {facility} from './documents/facility'
import {galleryPage} from './documents/gallery-page'
import {homePage} from './documents/home-page'
import {membershipPlan} from './documents/membership-plan'
import {promotion} from './documents/promotion'
import {siteSettings} from './documents/site-settings'
import {accessibleImage} from './objects/accessible-image'
import {callToAction} from './objects/call-to-action'
import {seo} from './objects/seo'

export const schemaTypes = [
  accessibleImage,
  callToAction,
  seo,
  siteSettings,
  homePage,
  contactPage,
  galleryPage,
  membershipPlan,
  promotion,
  coach,
  facility,
]
