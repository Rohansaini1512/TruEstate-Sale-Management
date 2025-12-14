// In-memory database - no external database connection required

export const connectDB = async (): Promise<void> => {
  console.log('✓ Using in-memory data store');
  console.log('  No external database connection required');
};

export const disconnectDB = async (): Promise<void> => {
  console.log('In-memory data store - no cleanup needed');
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});
