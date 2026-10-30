import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import process from 'node:process'

/* global console */

const input = resolve(process.argv[2] || 'migration/generated/hexodus.ndjson')
const lines = (await readFile(input, 'utf8')).split('\n').filter(Boolean)
const docs = lines.map((line, index) => {
  try { return JSON.parse(line) } catch (error) { throw new Error(`JSON inválido en línea ${index + 1}: ${error.message}`, {cause: error}) }
})
const ids = new Set()
for (const doc of docs) {
  if (!doc._id || !doc._type) throw new Error(`Documento sin _id o _type: ${JSON.stringify(doc).slice(0, 120)}`)
  if (ids.has(doc._id)) throw new Error(`_id duplicado: ${doc._id}`)
  ids.add(doc._id)
}
const requiredSingletons = ['siteSettings', 'homePage', 'contactPage', 'galleryPage']
for (const id of requiredSingletons) if (!ids.has(id)) throw new Error(`Falta singleton: ${id}`)
const count = (type) => docs.filter((doc) => doc._type === type).length
const expected = {membershipPlan: 6, promotion: 1, coach: 2, facility: 32}
for (const [type, minimum] of Object.entries(expected)) {
  if (count(type) < minimum) throw new Error(`${type}: se esperaban al menos ${minimum}, se encontraron ${count(type)}`)
}
const approvals = docs.find((doc) => doc._id === 'siteSettings')?.contentApproval
if (!approvals || Object.values(approvals).some((value) => typeof value !== 'boolean')) throw new Error('Faltan banderas explícitas de aprobación del contenido')
console.log(JSON.stringify({valid: true, documents: docs.length, byType: Object.fromEntries([...new Set(docs.map((doc) => doc._type))].sort().map((type) => [type, count(type)]))}, null, 2))
