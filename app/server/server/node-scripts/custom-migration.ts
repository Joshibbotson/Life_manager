import { execSync } from 'child_process'

const migrationName = process.argv[2]

if (!migrationName) {
  console.error('Usage: ts-node custom-migration.ts <migrationName>')
  process.exit(1)
}

const command = `typeorm migration:create ./src/migration/${migrationName}`

try {
  execSync(command, { stdio: 'inherit' })
} catch (error) {
  console.error('An error occurred:', error.message)
  process.exit(1)
}
