import * as cluster from 'node:cluster';
import * as os from 'node:os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;
const clusterManager: cluster.Cluster = cluster as any;

@Injectable()
export class AppClusterService {
  static clusterize(callback: () => Promise<void>): void {
    if (clusterManager.isPrimary) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs - 1; i++) {
        clusterManager.fork();
      }
      clusterManager.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        clusterManager.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
