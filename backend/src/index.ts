import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRoutes from './routes/salesRoutes';
import { connectDB } from './config/database';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Health check endpoint
    app.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'ok', message: 'Server is running', database: 'connected' });
    });

    // API Routes
    app.use('/api/sales', salesRoutes);

    // Root endpoint
    app.get('/', (req: Request, res: Response) => {
      res.json({
        message: 'Retail Sales Management System API',
        version: '1.0.0',
        endpoints: {
          health: '/health',
          sales: '/api/sales',
          salesFilters: '/api/sales/filters',
        },
      });
    });

    // 404 handler
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
      });
    });

    // Error handler
    app.use(
      (
        err: any,
        req: Request,
        res: Response,
        next: any
      ) => {
        console.error('Unhandled error:', err);
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          message: err.message || 'An unexpected error occurred',
        });
      }
    );

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Retail Sales API Server running at http://localhost:${PORT}`);
      console.log(`📊 Health Check: http://localhost:${PORT}/health`);
      console.log(`📋 Sales Data: http://localhost:${PORT}/api/sales`);
      console.log(`🔍 Filter Options: http://localhost:${PORT}/api/sales/filters\n`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
