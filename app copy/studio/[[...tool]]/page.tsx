'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '../../../sanity/schemas'

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  title: 'Leaders Press Africa Studio',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})

export default function StudioPage() {
  return <NextStudio config={config} />
}