import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'yr2v9nsi',
    dataset: 'production'
  },
  deployment: {
    appId: 'rrmy5ue2ssmbb5wpdvmzs4f3',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
