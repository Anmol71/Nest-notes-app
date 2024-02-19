import * as cluster from 'node:cluster';
import * as os from 'node:os';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IClusterConfig } from 'src/env-config/clusterConfig';

const numCPUs = os.cpus().length;
const clusterManager: cluster.Cluster = cluster as any;

@Injectable()
export class AppClusterService {
  constructor(private configService: ConfigService) {}

  public clusterize(bootstrapFn: () => Promise<void>): void {
    const config = this.configService.get<IClusterConfig>('config');
    console.log(config);
    const useClustering = config.enable_clustering;
    if (useClustering && clusterManager.isPrimary) {
      this.startInWorker();
    } else {
      this.startInMain(bootstrapFn);
    }
  }

  public startInMain(bootstrapFn: () => Promise<void>) {
    return bootstrapFn();
  }

  public startInWorker() {
    console.log(`Master server started on ${process.pid}`);
    for (let i = 0; i < numCPUs - 1; i++) {
      clusterManager.fork();
    }
    clusterManager.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died. Restarting`);
      clusterManager.fork();
    });
  }
}
