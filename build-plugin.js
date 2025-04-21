// Netlify build plugin to log information for debugging
module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Node version:', process.version);
    console.log('NPM version:', process.env.npm_version);
    console.log('Current directory:', process.cwd());
    
    // List all files in the root directory
    try {
      const fs = require('fs');
      console.log('Files in root directory:');
      fs.readdirSync('./').forEach(file => {
        console.log(' - ' + file);
      });

      // Check if package.json exists and log its contents
      if (fs.existsSync('./package.json')) {
        const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        console.log('Dependencies:', Object.keys(packageJson.dependencies || {}));
        console.log('DevDependencies:', Object.keys(packageJson.devDependencies || {}));
      } else {
        console.log('package.json not found!');
      }
    } catch (error) {
      console.error('Error in build plugin:', error);
    }
  }
}; 