// Exports catalog-data.ts to catalog-export.json in the ebmx-backend folder.
// Run with: npm run export:catalog
// The backend import script reads that JSON file.
import { CATALOG } from '../data/catalog-data'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const outDir = join(process.cwd(), '..', 'ebmx-backend')
const outPath = join(outDir, 'catalog-export.json')

if (!existsSync(outDir)) {
  console.error(`Backend directory not found: ${outDir}`)
  console.error('Run create-medusa-app first to create ebmx-backend')
  process.exit(1)
}

writeFileSync(outPath, JSON.stringify(CATALOG, null, 2), 'utf-8')
console.log(`✓ Exported ${CATALOG.length} products to ${outPath}`)
