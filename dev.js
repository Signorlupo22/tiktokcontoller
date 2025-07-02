const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting TikTok Controller with Hot Reload...');
console.log('📁 Watching for changes in src/ directory');
console.log('🔄 Auto-restart on file changes enabled');
console.log('⏹️  Press Ctrl+C to stop\n');

const child = spawn('npx', ['nodemon', '--config', 'nodemon.json'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Failed to start nodemon:', error);
  process.exit(1);
});

child.on('close', (code) => {
  console.log(`\n👋 Development server stopped with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down development server...');
  child.kill('SIGTERM');
}); 