export async function retryWithBackoff<T>(
    callback: () => Promise<T>, 
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let attempts = 0;
  
    while (attempts < maxRetries) {
      try {
        return await callback();
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed:`, error);
  
        if (attempts >= maxRetries) {
          throw new Error(`Failed after ${maxRetries} attempts: ${error}`);
        }
  
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  
    throw new Error("Unexpected error: reached unreachable code.");
  }
  