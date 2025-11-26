// Mock API Layer - simulates backend responses with delays
export async function mockDelay(ms = 800) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockFetch<T>(data: T, delay = 800): Promise<T> {
  await mockDelay(delay)
  return data
}

export class MockAPIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "MockAPIError"
  }
}

export async function mockAPI<T>(
  fn: () => T | Promise<T>,
  options?: { delay?: number; errorRate?: number },
): Promise<T> {
  const delay = options?.delay ?? 800
  const errorRate = options?.errorRate ?? 0

  await mockDelay(delay)

  // Simulate random errors
  if (Math.random() < errorRate) {
    throw new MockAPIError(500, "Simulated server error")
  }

  return fn()
}
