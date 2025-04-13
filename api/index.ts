import serverless from 'serverless-http';
import app from '../src/app';

// Export the Express app wrapped as a serverless function
export default serverless(app);