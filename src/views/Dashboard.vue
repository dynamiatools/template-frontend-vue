<template>
  <AdminLayout>
    <div class="mx-auto max-w-screen-2xl p-4 md:p-6">
      <h1 class="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Welcome to {{ projectName }}
      </h1>
      <p class="mb-6 text-gray-500 dark:text-gray-400">
        This dashboard is wired to your DynamiaTools backend. Replace this page with your own.
      </p>

      <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 class="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">Backend connection</h2>

        <div v-if="loading" class="text-gray-500 dark:text-gray-400">Loading navigation from the API…</div>

        <div v-else-if="error" class="text-error-500">
          Could not reach the backend at <code>{{ apiBaseUrl }}</code>: {{ error }}
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Start the backend (<code>cd ../backend &amp;&amp; ./mvnw spring-boot:run</code>) and set
            <code>VITE_API_BASE_URL</code> in <code>.env</code> if it's not on <code>{{ apiBaseUrl }}</code>.
          </p>
        </div>

        <div v-else class="text-success-500">
          Connected — {{ nodes.length }} module(s) registered.
        </div>
      </div>

      <div class="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 class="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">Next steps</h2>
        <ul class="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
          <li>Replace this page and add your own routes in <code>src/router</code>.</li>
          <li>
            Build real modules with the components from
            <code>@dynamia-tools/tailadmin-vue</code> (layout, tables, forms — see its
            <a class="text-brand-500 hover:underline" href="https://github.com/dynamiatools/tailadmin-vue-template" target="_blank">docs</a>)
            and <code>@dynamia-tools/vue</code>'s composables (<code>useCrud</code>,
            <code>useCrudPage</code>, <code>useNavigation</code>) for data.
          </li>
          <li>Swap the default sidebar/header content for your own via <code>AdminLayout</code>'s slots.</li>
        </ul>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@dynamia-tools/tailadmin-vue/components/layout/AdminLayout.vue'
import { useNavigation } from '@dynamia-tools/vue'
import { dynamiaClient } from '../lib/dynamia'

// Token replaced by the CLI at generation time (must stay a plain string in <script>,
// never inline as raw {{ }} text inside <template> -- see this repo's README).
const projectName = '{{PROJECT_NAME}}'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
// useNavigation() loads the navigation tree on mount automatically.
const { nodes, loading, error } = useNavigation(dynamiaClient)
</script>
