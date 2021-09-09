function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function importRetry(
  importFn: () => Promise<{ default: React.ComponentType<any> }>,
  retries = 2,
  interval = 1000
): Promise<{ default: React.ComponentType<any> }> {
  try {
    return await importFn()
  } catch (error) {
    if (retries) {
      await wait(interval)
      return importRetry(importFn, retries - 1, interval)
    }
    throw new Error(`importRetry - ${error}`)
  }
}

export default importRetry
